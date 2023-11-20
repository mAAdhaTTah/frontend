import {
  AbstractIterator,
  AbstractKeyIterator,
  AbstractLevel,
  AbstractValueIterator,
} from 'abstract-level';
import ModuleError from 'module-error';
import { Client } from 'pg';
import Cursor from 'pg-cursor';

/** @param {IteratorOptions<any>} options
 * @returns {{ query: string; params: any[]; }}
 */
const queryFromOptions = options => {
  let query = 'SELECT key, value FROM kv';

  const params = [];
  if (options.gt) {
    params.push(options.gt);
    query += ` WHERE key > $${params.length}`;
  } else if (options.gte) {
    params.push(options.gte);
    query += ` WHERE key >= $${params.length}`;
  }

  if (options.lt) {
    params.push(options.lt);
    query += ` ${options.gt || options.gte ? 'AND' : 'WHERE'} key < $${
      params.length
    }`;
  } else if (options.lte) {
    params.push(options.lte);
    query += ` ${options.gt || options.gte ? 'AND' : 'WHERE'} key <= $${
      params.length
    }`;
  }

  if (options.reverse) {
    query += ' ORDER BY key DESC';
  } else {
    query += ' ORDER BY key ASC';
  }

  if (options.limit && options.limit !== -1) {
    query += ` LIMIT ${options.limit}`;
  }

  return { query, params };
};

/** */
class PostgresBatches {
  batch;
  constructor(batch) {
    this.batch = batch;
  }

  /** @private
   * @param {[string, string?][]} batch
   * @returns {QueryConfig}
   */
  _insert(batch) {
    let idx = 0;
    let vars = '';
    const values = [];
    for (const [key, value] of batch) {
      idx++;
      vars += `($${idx},`;
      values.push(key);
      idx++;
      vars += `$${idx}),`;
      values.push(value);
    }
    return {
      text: `INSERT INTO kv (key, value) VALUES ${vars.slice(0, -1)}`,
      values,
    };
  }

  /** @private
   * @param {[string, string?][]} batch
   * @returns {QueryConfig}
   */
  _delete(batch) {
    let idx = 0;
    let vars = '';
    const values = [];
    for (const [value] of batch) {
      idx++;
      vars += `$${idx},`;
      values.push(value);
    }
    return {
      text: `DELETE FROM kv WHERE key IN (${vars.slice(0, -1)})`,
      values,
    };
  }

  /** @returns {IterableIterator<QueryConfig>} */
  *[Symbol.iterator]() {
    let curBatch = [];
    let curType;
    for (const op of this.batch) {
      if (curType === undefined) {
        curType = op.type;
      } else if (curType !== op.type) {
        if (curType === 'put') {
          yield this._insert(curBatch);
        } else if (curType === 'del') {
          yield this._delete(curBatch);
        }
        curBatch = [];
        curType = op.type;
      }
      if (op.type === 'put') {
        curBatch.push([op.key.toString(), op.value.toString()]);
      } else if (op.type === 'del') {
        curBatch.push([op.key.toString()]);
      }
    }
    if (curBatch.length > 0) {
      if (curType === 'put') {
        yield this._insert(curBatch);
      } else if (curType === 'del') {
        yield this._delete(curBatch);
      }
    }
  }
}

/**
 * @extends AbstractIterator<
 *   PostgresLevel<KDefault, VDefault>,
 *   KDefault,
 *   VDefault
 * >
 */
class PostgresIterator extends AbstractIterator {
  /** @private */
  cursor = undefined;

  constructor(db, options, client) {
    super(db, options);

    const { query, params } = queryFromOptions(options);
    this.cursor = client.query(new Cursor(query, params));
  }

  /** @param {NextCallback<KDefault, VDefault>} callback
   * @returns {Promise<any>}
   */
  async _next(callback) {
    const result = await this.cursor.read(1);
    if (result.length > 0) {
      return this.db.nextTick(callback, null, result[0].key, result[0].value);
    } else {
      return this.db.nextTick(callback, null, undefined, undefined);
    }
  }
}
/**
 * @extends AbstractKeyIterator<
 *   PostgresLevel<KDefault, VDefault>,
 *   KDefault
 * >
 */
class PostgresKeyIterator extends AbstractKeyIterator {
  /** @private */
  cursor = undefined;

  constructor(db, options, client) {
    super(db, options);
    const { query, params } = queryFromOptions(options);
    this.cursor = client.query(new Cursor(query, params));
  }

  /** @param {NextCallback<KDefault, VDefault>} callback
   * @returns {Promise<any>}
   */
  async _next(callback) {
    const result = await this.cursor.read(1);
    if (result.length > 0) {
      return this.db.nextTick(callback, null, result[0].key, result[0].value);
    } else {
      return this.db.nextTick(callback, null, undefined, undefined);
    }
  }
}
/**
 * @extends AbstractValueIterator<
 *   PostgresLevel<KDefault, VDefault>,
 *   KDefault,
 *   VDefault
 * >
 */
class PostgresValueIterator extends AbstractValueIterator {
  /** @private */
  client = undefined;
  /** @private */
  iterator = undefined;

  constructor(db, options, client) {
    super(db, options);
    this.client = client;

    const { query, params } = queryFromOptions(options);
    const stmt = this.client.prepare(query);
    this.iterator = stmt.iterate(params);
  }

  /** @param {NextCallback<KDefault, VDefault>} callback
   * @returns {Promise<any>}
   */
  async _next(callback) {
    const result = this.iterator.next();
    if (!result.done) {
      return this.db.nextTick(callback, null, result.value.value);
    } else {
      return this.db.nextTick(callback, null, undefined);
    }
  }
}

/** @extends AbstractLevel<Buffer | Uint8Array | string, KDefault, VDefault> */
export class PostgresLevel extends AbstractLevel {
  /** @public */
  db;

  constructor(options) {
    const encodings = { utf8: true };
    super({ encodings }, options);
    this.db = new Client(options.client);
  }

  get type() {
    return 'postgres';
  }

  /** @param {AbstractOpenOptions} options
   * @param {(error?: Error) => void} callback
   * @returns {Promise<void>}
   */
  async _open(options, callback) {
    await this.db.connect();
    await this.db.query('CREATE TABLE IF NOT EXISTS kv (key TEXT, value TEXT)');
    await this.db.query(
      'CREATE UNIQUE INDEX IF NOT EXISTS kv_key_unique_index ON kv (key);',
    );
    const result = await this.db.query(`SELECT  constraint_schema
,       constraint_name 
FROM    information_schema.table_constraints 
WHERE   constraint_name = 'kv_key_unique_constraint';`);
    if (result.rowCount === 0)
      await this.db.query(
        `ALTER TABLE kv ADD CONSTRAINT kv_key_unique_constraint UNIQUE USING INDEX kv_key_unique_index;`,
      );
    this.nextTick(callback);
  }

  /** @param {(error?: Error) => void} callback
   * @returns {Promise<void>}
   */
  async _close(callback) {
    await this.db.end();
    this.nextTick(callback);
  }

  /** @param {Buffer} key
   * @param {any} options
   * @param {(error?: Error, value?: Buffer) => void} callback
   * @returns {Promise<any>}
   */
  async _get(key, options, callback) {
    const result = await this.db.query('SELECT value FROM kv WHERE key = $1', [
      key,
    ]);
    const row = result.rows[0];
    if (row) {
      return this.nextTick(callback, null, row.value);
    } else {
      return this.nextTick(
        callback,
        new ModuleError(`Key ${key} was not found`, {
          code: 'LEVEL_NOT_FOUND',
        }),
      );
    }
  }

  /** @param {Buffer} key
   * @param {Buffer} value
   * @param {any} options
   * @param {(error?: Error) => void} callback
   * @returns {Promise<void>}
   */
  async _put(key, value, options, callback) {
    await this.db.query(
      'INSERT INTO kv (key, value) VALUES ($1, $2) ON CONFLICT ON CONSTRAINT kv_key_unique_constraint DO UPDATE SET value = $2',
      [key.toString(), value.toString()],
    );
    this.nextTick(callback);
  }

  /** @param {Buffer} key
   * @param {any} options
   * @param {(error?: Error) => void} callback
   * @returns {Promise<void>}
   */
  async _del(key, options, callback) {
    await this.db.query('DELETE FROM kv WHERE key = $1', [key.toString()]);
    this.nextTick(callback);
  }

  /** @param {BatchOperation[]} batch
   * @param {any} options
   * @param {(error?: Error) => void} callback
   * @returns {Promise<void>}
   */
  async _batch(batch, options, callback) {
    for (const query of new PostgresBatches(batch)) {
      try {
        await this.db.query(query);
      } catch (err) {
        console.log('failed query', query);
        throw err;
      }
    }
    this.nextTick(callback);
  }

  /** @param {any} options
   * @param {(error?: Error) => void} callback
   * @returns {Promise<void>}
   */
  async _clear(options, callback) {
    await this.db.query(`DELETE FROM kv WHERE key like '${options.gte}%'`);
    this.nextTick(callback);
  }

  /** @param {IteratorOptions<KDefault>} options
   * @returns {PostgresIterator<KDefault, VDefault>}
   */
  _iterator(options) {
    return new PostgresIterator(this, options, this.db);
  }

  /** @param {IteratorOptions<KDefault>} options
   * @returns {PostgresKeyIterator<KDefault, VDefault>}
   */
  _keys(options) {
    return new PostgresKeyIterator(this, options, this.db);
  }

  /** @param {IteratorOptions<KDefault>} options
   * @returns {PostgresValueIterator<KDefault, VDefault>}
   */
  _values(options) {
    return new PostgresValueIterator(this, options, this.db);
  }
}

/**
 * @typedef {{
 *   client: string | ClientConfig;
 * } & AbstractDatabaseOptions<K, V>} PostgresLevelOptions
 * @template K
 * @template V
 */
/** @typedef {BatchPutOperation | BatchDelOperation} BatchOperation */

/**
 * A _put_ operation to be committed by a {@link PostgresLevel}.
 * @typedef {Object} BatchPutOperation
 * @property {'put'} type Type of operation.
 * @property {Buffer} key Key of the entry to be added to the database.
 * @property {Buffer} value Value of the entry to be added to the database.
 */
/**
 * A _del_ operation to be committed by a {@link PostgresLevel}.
 * @typedef {Object} BatchDelOperation
 * @property {'del'} type Type of operation.
 * @property {Buffer} key Key of the entry to be deleted from the database.
 */
/** @typedef {Object} IteratorOptions
 * @property {number} [limit]
 * @property {string} keyEncoding
 * @property {string} valueEncoding
 * @property {boolean} reverse
 * @property {boolean} keys
 * @property {boolean} values
 * @property {KDefault} [gt]
 * @property {KDefault} [gte]
 * @property {KDefault} [lt]
 * @property {KDefault} [lte]
 */
