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
  parseISO,
} from 'date-fns';
import { shared } from '../config';
import { wp } from './wp';
import * as cache from './cache';

export const getLayoutProps = async () => {
  const { data: siteMeta } = await wp.get(
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
  const { data: seo } = await wp.get(
    `https://${shared.WP_API_DOMAIN}/wp-json/wp/v2/pages/${pageId}`,
  );

  return {
    title: seo.title.rendered,
    metas: seo.yoast_meta,
    schemas: seo.yoast_json_ld,
  };
};

const SLUG_BLACKLIST = ['writing', 'home', 'reading', 'resume', 'gistpens'];

export const isAllowedSlug = slug => !SLUG_BLACKLIST.includes(slug);

export const getPageSlugs = async () => {
  const { data: pages } = await wp.get(
    `https://${shared.WP_API_DOMAIN}/wp-json/wp/v2/pages`,
    {
      data: {
        posts_per_page: 100,
      },
    },
  );

  const results = [];

  for (const page of pages) {
    if (isAllowedSlug(page.slug)) {
      await cache.add(page.slug, page);
      results.push({
        params: {
          slug: page.slug,
        },
      });
    }
  }

  return results;
};

/**
 * @param {string} slug  Post or page slug.
 */
export const getContextBySlug = async slug => {
  const page = await cache.get(slug);

  return {
    data: {
      title: page.title.rendered,
      content: page.content.rendered,
    },
    seo: {
      title: page.title.rendered,
      metas: page.yoast_meta,
      schemas: page.yoast_json_ld,
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

export const getGistpens = async ({ page }) => {
  const { data, headers } = await wp.get(
    `https://${shared.WP_API_DOMAIN}/wp-json/intraxia/v1/gistpen/repos`,
    {
      params: { page },
    },
  );

  for (const repo of data) {
    await cache.add(repo.slug, repo);
  }

  return {
    posts: data.map(repo => ({
      id: repo.ID,
      description: repo.description,
      blobs: repo.blobs,
      date: format(parseISO(repo.created_at), 'MMMM do, yyyy'),
      dateTime: repo.created_at,
    })),
    page: Number(page),
    hasNextPage: Number(headers['x-wp-totalpages']) > page,
  };
};

export const getGistpenArchivePaths = async () => {
  const { headers } = await wp.head(
    `https://${shared.WP_API_DOMAIN}/wp-json/intraxia/v1/gistpen/repos`,
  );

  return [
    ...Array(Number(headers['x-wp-totalpages']) - 1).fill(2),
  ].map((num, idx) => ({ params: { number: String(num + idx) } }));
};

export const getGistpenSlugPaths = async () => {
  const { data } = await wp.get(
    `https://${shared.WP_API_DOMAIN}/wp-json/intraxia/v1/gistpen/repos`,
    {
      params: {
        per_page: 100,
      },
    },
  );

  for (const repo of data) {
    await cache.add(repo.slug, repo);
  }

  return data.map(repo => ({
    params: { slug: repo.slug },
  }));
};

export const getGistpenBySlug = async ({ slug }) => {
  const repo = await cache.get(slug);

  return {
    seo: {
      title: repo.description,
      metas: [],
      schemas: [],
    },
    post: {
      id: repo.ID,
      description: repo.description,
      blobs: await Promise.all(
        repo.blobs.map(async ({ rest_url }) => {
          const { data } = await wp.get(rest_url);

          return data;
        }),
      ),
      date: format(parseISO(repo.created_at), 'MMMM do, yyyy'),
      dateTime: repo.created_at,
    },
  };
};
