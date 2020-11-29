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
