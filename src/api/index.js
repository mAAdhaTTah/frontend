import fs from 'fs';
import path from 'path';
import https from 'https';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import {
  subDays,
  getUnixTime,
  fromUnixTime,
  endOfDay,
  format,
  parse,
} from 'date-fns';
import { shared } from '../config';
import { client } from './client';

export const getLayoutProps = async () => {
  const { data: siteMeta } = await client.get(
    `https://${shared.WP_API_DOMAIN}/wp-json/`,
  );

  return {
    site: {
      name: siteMeta.name,
      description: siteMeta.description,
      url: `https://${shared.WP_API_DOMAIN}`,
    },
  };
};

/**
 * @param {number} pageId
 */
export const getSeoByPageId = async pageId => {
  const { data: seo } = await client.get(
    `https://${shared.WP_API_DOMAIN}/wp-json/wp/v2/pages/${pageId}`,
  );

  return {
    title: seo.title.rendered,
    metas: seo.yoast_meta,
    schemas: seo.yoast_json_ld,
  };
};

const SLUG_BLACKLIST = ['writing', 'home', 'reading', 'resume'];

export const isAllowedSlug = slug => !SLUG_BLACKLIST.includes(slug);

export const getPageSlugs = async () => {
  const { data: pages } = await client.get(
    `https://${shared.WP_API_DOMAIN}/wp-json/wp/v2/pages`,
    {
      data: {
        posts_per_page: 100,
      },
    },
  );

  return pages
    .filter(({ slug }) => isAllowedSlug(slug))
    .map(({ slug }) => ({
      params: {
        slug,
        type: 'page',
      },
    }));
};

/**
 * @param {string} slug  Post or page slug.
 * @param {'post' | 'page'} type Type of slug to retrieve.
 */
export const getContextBySlug = async (slug, type) => {
  const { data } = await client.get(
    `https://${shared.WP_API_DOMAIN}/wp-json/wp/v2/${type}s`,
    {
      params: { slug },
    },
  );

  if (data.length !== 1) {
    throw new Error(`Expected to get one result, got ${data.length} results.`);
  }

  const [obj] = data;

  return {
    data: {
      title: obj.title.rendered,
      content: obj.content.rendered,
    },
    seo: {
      title: obj.title.rendered,
      metas: obj.yoast_meta,
      schemas: obj.yoast_json_ld,
    },
  };
};

export const getResume = async () => {
  const experiences = JSON.parse(
    await fs.promises.readFile(
      path.join(process.cwd(), 'data', 'resume', 'experience.json'),
      'utf-8',
    ),
  ).map(experience => ({
    ...experience,
    positions: experience.positions.map(position => ({
      ...position,
      start: format(parse(position.start, 'yyyy-MM', new Date()), 'MMMM yyyy'),
      end: position.end
        ? format(parse(position.end, 'yyyy-MM', new Date()), 'MMMM yyyy')
        : null,
    })),
  }));
  const skills = JSON.parse(
    await fs.promises.readFile(
      path.join(process.cwd(), 'data', 'resume', 'skills.json'),
      'utf-8',
    ),
  );

  return { experiences, skills };
};

const downloadDb = async dest => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);

    const rejectWithCleanup = err => {
      file.close();
      fs.unlink(dest, () => {
        reject(err);
      });
    };

    file.on('finish', () => {
      resolve();
    });

    const request = https.get(
      'https://static.jamesdigioia.com/index.sqlite3',
      response => {
        if (response.statusCode === 200) {
          response.pipe(file);
        } else {
          rejectWithCleanup(
            new Error(
              `Server responded with ${response.statusCode}: ${response.statusMessage}`,
            ),
          );
        }
      },
    );

    request.on('error', err => {
      rejectWithCleanup(err);
    });

    file.on('error', err => {
      rejectWithCleanup(err);
    });
  });
};

export const getReadingProps = async () => {
  let db;
  const now = new Date();
  const dbFile = path.join(process.cwd(), 'data', 'index.sqlite3');

  try {
    await downloadDb(dbFile);
    db = await open({
      filename: dbFile,
      driver: sqlite3.Database,
    });

    const days = [];

    for (let i = 0; i < 7; i++) {
      const targetDay = subDays(now, i);
      const results = await db.all(
        'SELECT id, title, url, timestamp FROM core_snapshot WHERE timestamp < :before AND timestamp >= :after ORDER BY timestamp DESC;',
        {
          ':before': getUnixTime(endOfDay(targetDay)),
          ':after': getUnixTime(endOfDay(subDays(targetDay, 1))),
        },
      );

      days.push({
        day: format(targetDay, 'MMM do, yyyy'),
        links: results.map(link => ({
          id: link.id,
          title: link.title,
          url: link.url,
          readAt: format(fromUnixTime(link.timestamp), 'hh:mm a'),
        })),
      });
    }

    return days;
  } finally {
    await db?.close();
    await fs.promises.unlink(dbFile);
  }
};
