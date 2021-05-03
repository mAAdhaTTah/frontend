import fs from 'fs';
import path from 'path';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const CACHE_DB_FILE = path.join(process.cwd(), 'data', 'cache.sqlite3');

const checkExists = file => {
  return fs.promises
    .access(file, fs.constants.F_OK)
    .then(() => true)
    .catch(() => false);
};

const safeOpen = async () => {
  if (!(await checkExists(CACHE_DB_FILE))) {
    await fs.promises.appendFile(CACHE_DB_FILE, '');
  }

  const db = await open({
    filename: CACHE_DB_FILE,
    driver: sqlite3.Database,
  });

  await db.run(
    `CREATE TABLE IF NOT EXISTS cache (
      key TEXT UNIQUE PRIMARY KEY,
      value TEXT
    );`,
  );

  return db;
};

let db;

const sleep = ms => new Promise(res => setTimeout(res, ms));

const openAndRun = async (statement, values, retry = 0) => {
  try {
    if (!db) {
      db = await safeOpen();
    }

    return await db.run(statement, values);
  } catch (err) {
    if (retry < 5) {
      await sleep(500);
      return await openAndRun(statement, values, retry + 1);
    }
    throw err;
  }
};

const openAndGet = async (statement, values, retry = 0) => {
  try {
    if (!db) {
      db = await safeOpen();
    }

    return await db.get(statement, values);
  } catch (err) {
    if (retry < 5) {
      await sleep(500);
      return await openAndRun(statement, values, retry + 1);
    }
    throw err;
  }
};

export const add = ($key, $value) => {
  return openAndRun(`INSERT OR REPLACE INTO cache VALUES($key, $value)`, {
    $key: encodeURIComponent($key),
    $value: JSON.stringify($value),
  });
};

export const get = async $key => {
  const row = await openAndGet(`SELECT value FROM cache WHERE key = $key`, {
    $key: encodeURIComponent($key),
  });

  if (!row) {
    throw new Error(`Value for slug ${$key} not found.`);
  }

  return JSON.parse(row.value);
};

export const addRepo = async repo => {
  await add(`gistpen-${repo.slug}`, repo);

  for (const blob of repo.blobs) {
    await add(`snippet-${repo.slug}-${blob.filename}`, blob);
  }
};

export const getRepo = repoSlug => get(`gistpen-${repoSlug}`);

export const getBlob = (repoSlug, blobSlug) =>
  get(`snippet-${repoSlug}-${blobSlug}`);
