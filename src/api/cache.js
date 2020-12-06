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

const runAndClose = async (statement, values) => {
  let db;
  try {
    db = await safeOpen();

    return await db.run(statement, values);
  } finally {
    await db?.close();
  }
};

const getAndClose = async (statement, values) => {
  let db;
  try {
    db = await safeOpen();

    return await db.get(statement, values);
  } finally {
    await db?.close();
  }
};

export const add = async ($key, $value) => {
  return runAndClose(`INSERT OR REPLACE INTO cache VALUES($key, $value)`, {
    $key,
    $value: JSON.stringify($value),
  });
};

export const get = async $key => {
  const { value } = await getAndClose(
    `SELECT value FROM cache WHERE key = $key`,
    {
      $key,
    },
  );

  return JSON.parse(value);
};
