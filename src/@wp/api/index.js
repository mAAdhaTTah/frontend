import fs from 'fs';
import path from 'path';
import { subDays, endOfDay, format, parse, parseISO } from 'date-fns';
import Axios from 'axios';
import parseLinkHeader from 'parse-link-header';
import { strapi } from '@strapi/api';
import { wp } from './wp';
import * as cache from './cache';

export * from './layout';

const mapPostToProps = async post => {
  const result = {
    id: post.id,
    slug: post.slug,
    format: post.format,
    title: post.title.rendered,
    date: format(parseISO(post.date), 'MMMM do, yyyy'),
    dateTime: post.date,
    commentCount: 0,
    author:
      post._embedded?.author[0] ??
      (await Axios.get(post._links.author[0].href)).data,
    excerpt: post.excerpt.rendered,
    oembed: await getOembed(post),
    content: post.content.rendered,
  };

  switch (result.format) {
    case 'standard':
      if (post.featured_media) {
        const featured = await wp.get(
          `/wp-json/wp/v2/media/${post.featured_media}`,
        );
        result.media = {
          url: featured.data.source_url,
          alt: featured.data.alt_text,
        };
      } else {
        result.media = null;
      }
      break;
    case 'link':
      result.meta = {
        linkUrl: post.meta._format_link_url,
      };
      break;
    case 'quote':
      result.meta = {
        quoteSourceUrl: post.meta._format_quote_source_url,
        quoteSourceName: post.meta._format_quote_source_name,
      };
      break;
    case 'image':
      const image = await wp.get(`/wp-json/wp/v2/media/${post.featured_media}`);
      result.media = {
        url: image.data.source_url,
        alt: image.data.alt_text,
      };
      break;
    case 'gallery':
      const { data } = await wp.get(post._links['wp:attachment'][0].href, {
        params: { per_page: 100 },
      });
      result.images = data.map(image => ({
        url: image.source_url,
        alt: image.alt_text,
      }));
      break;
    default:
      break;
  }

  return result;
};

/**
 * @param {number} pageId
 */
export const getSeoByPageId = async pageId => {
  const { data: seo } = await wp.get(`/wp-json/wp/v2/pages/${pageId}`);

  return {
    title: seo.title.rendered,
    metas: seo.yoast_meta,
    schemas: seo.yoast_json_ld,
  };
};

const SLUG_BLACKLIST = ['writing', 'home', 'reading', 'resume', 'gistpens'];

export const isAllowedSlug = slug => !SLUG_BLACKLIST.includes(slug);

export const getPageSlugs = async () => {
  const { data: pages } = await wp.get(`/wp-json/wp/v2/pages`, {
    params: {
      per_page: 100,
    },
  });

  const results = [];

  for (const page of pages) {
    if (isAllowedSlug(page.slug)) {
      await cache.addPost(page);
      results.push({
        params: {
          slug: page.slug.split('/'),
        },
      });
    }
  }

  return results;
};

export const getPostSlugs = async () => {
  async function* getPosts(page = 1) {
    const { data: posts, headers } = await wp.get(`/wp-json/wp/v2/posts`, {
      params: {
        per_page: 100,
        page,
      },
    });

    const links = parseLinkHeader(headers['link']);

    yield* posts;

    if (links.next) {
      yield* await getPosts(page + 1);
    }
  }

  const results = [];

  for await (const post of getPosts()) {
    await cache.addPost(post);
    results.push({
      params: {
        slug: post.slug.split('/'),
      },
    });
  }

  return results;
};

/**
 * @param {string} slug  Post or page slug.
 */
export const getContextBySlug = async slug => {
  const page = await cache.getPost(slug);

  let data = {};

  switch (page.type) {
    case 'page':
      data = {
        title: page.title.rendered,
        content: page.content.rendered,
      };
      break;
    case 'post':
      data = await mapPostToProps(page);
      break;
    default:
      break;
  }

  return {
    data,
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

export const getReadingProps = async () => {
  const now = new Date();

  const days = [];

  for (let i = 0; i < 7; i++) {
    const targetDay = subDays(now, i);
    const response = await strapi.get('/links', {
      params: {
        read_at_lte: endOfDay(targetDay),
        read_at_gt: endOfDay(subDays(targetDay, 1)),
        _sort: 'read_at:DESC',
        _limit: -1,
      },
    });

    if (response.data.length) {
      days.push({
        day: format(targetDay, 'MMM do, yyyy'),
        links: response.data.map(link => ({
          id: `link-${link.id}`,
          title: link.title,
          url: link.url,
          readAt: format(parseISO(link.read_at), 'hh:mm a'),
        })),
      });
    }
  }

  return days;
};

export const getGistpens = async ({ page }) => {
  const { data, headers } = await wp.get(`/wp-json/intraxia/v1/gistpen/repos`, {
    params: { page },
  });

  for (const repo of data) {
    await cache.addRepo(repo);
  }

  return {
    posts: data.map(repo => ({
      id: repo.ID,
      slug: repo.slug,
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
  const { headers } = await wp.head(`/wp-json/intraxia/v1/gistpen/repos`);

  return [...Array(Number(headers['x-wp-totalpages']) - 1).fill(2)].map(
    (num, idx) => ({ params: { number: String(num + idx) } }),
  );
};

export const getPostArchivePaths = async () => {
  const { headers } = await wp.head(`/wp-json/wp/v2/posts`);

  return [...Array(Number(headers['x-wp-totalpages']) - 1).fill(2)].map(
    (num, idx) => ({ params: { number: String(num + idx) } }),
  );
};

export const getGistpenSlugPaths = async () => {
  const { data } = await wp.get(`/wp-json/intraxia/v1/gistpen/repos`, {
    params: {
      per_page: 100,
    },
  });

  for (const repo of data) {
    await cache.addRepo(repo);
  }

  return data.map(repo => ({
    params: { slug: repo.slug },
  }));
};

export const getGistpenBySlug = async ({ slug }) => {
  const repo = await cache.getRepo(slug);

  return {
    seo: {
      title: repo.description,
      metas: [],
      schemas: [],
    },
    post: {
      id: repo.ID,
      slug: repo.slug,
      description: repo.description,
      blobs: repo.blobs,
      date: format(parseISO(repo.created_at), 'MMMM do, yyyy'),
      dateTime: repo.created_at,
    },
  };
};

const getOembed = async post => {
  const { _format_audio_embed: audioUrl, _format_video_embed: videoUrl } =
    post.meta;

  if (!audioUrl && !videoUrl) {
    return null;
  }

  const url = audioUrl || videoUrl;

  try {
    const { data } = await wp.get(
      `/wp-json/oembed/1.0/proxy?url=${encodeURIComponent(url)}`,
    );

    if (data.error) {
      throw new Error(data.error.message);
    }

    return { html: data.html, url };
  } catch {
    // @TODO(James) return HTML that "embeds" the error
    return { url, html: null };
  }
};

export const getPosts = async ({ page }) => {
  const { data, headers } = await wp.get(`/wp-json/wp/v2/posts`, {
    params: { page, _embed: 'author' },
  });

  for (const post of data) {
    await cache.addPost(post);
  }

  return {
    posts: await Promise.all(data.map(mapPostToProps)),
    page: Number(page),
    hasNextPage: Number(headers['x-wp-totalpages']) > page,
  };
};
