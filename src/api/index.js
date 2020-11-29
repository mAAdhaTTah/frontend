import fs from 'fs';
import path from 'path';
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
      path.join(process.cwd(), 'src', 'data', 'resume', 'experience.json'),
      'utf-8',
    ),
  );
  const skills = JSON.parse(
    await fs.promises.readFile(
      path.join(process.cwd(), 'src', 'data', 'resume', 'skills.json'),
      'utf-8',
    ),
  );

  return { experiences, skills };
};
