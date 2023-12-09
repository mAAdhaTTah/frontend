import { Feed } from 'feed';
import { parseISO } from 'date-fns';
import {
  getGistpenArchivePaths,
  getGistpenPaths,
  getTalkArchivePaths,
  getWritingArchivePaths,
  getWritingByPage,
} from '@tina/server';
import {
  ARCHIVE_SLUG,
  FIVE_HUNDRED_SLUG,
  FOUR_OH_FOUR_SLUG,
  HOME_SLUG,
  SINGLE_SLUG,
} from '@tina/routes';
import { client } from '../../tina/__generated__/client';

/**
 * @typedef {import('sitemap').SitemapItem} SitemapItem
 */

async function* getAllPages() {
  let hasNextPage = true,
    cursor;

  while (hasNextPage) {
    const response = await client.queries.pageConnection({
      first: 10,
      after: cursor,
    });

    yield* response.data.pageConnection.edges.map(edge => edge.node);
    hasNextPage = response.data.pageConnection.pageInfo.hasNextPage;
    cursor = response.data.pageConnection.pageInfo.endCursor;
  }
}

async function* getAllPosts() {
  let hasNextPage = true,
    cursor;

  while (hasNextPage) {
    const response = await client.queries.postConnection({
      first: 10,
      after: cursor,
    });

    yield* response.data.postConnection.edges.map(edge => edge.node);
    hasNextPage = response.data.postConnection.pageInfo.hasNextPage;
    cursor = response.data.postConnection.pageInfo.endCursor;
  }
}

async function* getAllFeedItems() {
  const response = await getWritingByPage(1, 10);
  const posts = response.data.postConnection.edges.map(({ node }) => node);
  for (const post of posts) {
    /** @type {import('feed').Item} */
    const item = {
      title: '',
      link: `https://jamesdigioia.com/writing/${post._sys.filename}`,
      date: parseISO(post.publishedAt),
    };
    switch (post.__typename) {
      case 'PostAudio':
        item.audio = {
          url: post.audio.url,
        };
        break;
      case 'PostLink':
      case 'PostGallery':
      case 'PostAside':
      case 'PostImage':
      case 'PostQuote':
      case 'PostStatus':
      case 'PostVideo':
        break;
      case 'PostStandard':
        item.title = post.title;
        break;
      // no default
    }
    yield item;
  }
}

export const buildFeed = async () => {
  const feed = new Feed({
    id: 'https://jamesdigioia.com/',
    link: 'https://jamesdigioia.com/',
    title: 'James DiGioia',
    description: 'my little web home',
    copyright: 'All rights reserved 2022, James DiGioia',
    author: {
      name: 'James DiGioia',
      email: 'jamesorodig@gmail.com',
      link: 'https://jamesdigioia.com/',
    },
  });

  for await (const item of getAllFeedItems()) {
    feed.addItem(item);
  }

  return feed;
};

/**
 * @param {Awaited<ReturnType<typeof getAllPosts>>} post
 * @returns
 */
const postToSitemapItem = post => {
  /** @type {SitemapItem} */
  const item = {
    img: [],
    video: [],
    links: [],
    url: `/writing/${post._sys.filename}/`,
    lastmod: post.updatedAt,
  };

  switch (post.__typename) {
    case 'PostAudio':
    case 'PostLink':
    case 'PostGallery':
    case 'PostAside':
    case 'PostImage':
    case 'PostQuote':
    case 'PostStatus':
    case 'PostVideo':
      break;
    case 'PostStandard':
      if (post.featuredMedia != null)
        item.img.push({
          url: post.featuredMedia.source,
          title: post.featuredMedia.caption || post.featuredMedia.altText,
        });
      break;
    // no default
  }

  return item;
};

/**
 * @param {Awaited<ReturnType<typeof getAllPages>>[number]} post
 * @returns {SitemapItem}
 */
const pageToSitemapItem = post => {
  /** @type {SitemapItem} */
  const item = {
    img: [],
    video: [],
    links: [],
    url: `/${post._sys.filename}/`,
    lastmod: post.updatedAt,
  };

  switch (post.__typename) {
    case 'PageFullScreen':
    case 'PageGistpenArchive':
    case 'PageGistpenSingle':
    case 'PageLanding':
    case 'PagePostArchive':
    case 'PagePostSingle':
    case 'PageReadingList':
      break;
    // no default
  }

  return item;
};

const pageToSitemapMapper = {
  writing: {
    async *[SINGLE_SLUG](page) {
      for await (const post of getAllPosts()) {
        yield postToSitemapItem(post);
      }
    },
    async *[ARCHIVE_SLUG](page) {
      const paths = await getWritingArchivePaths();

      for (const path of paths) {
        /** @type {SitemapItem} */
        const item = {
          img: [],
          video: [],
          links: [],
          url: `/writing/page/${path.params.number}/`,
        };

        yield item;
      }
    },
  },
  gistpens: {
    async *[SINGLE_SLUG](page) {
      const paths = await getGistpenPaths();

      for (const path of paths) {
        /** @type {SitemapItem} */
        const item = {
          img: [],
          video: [],
          links: [],
          url: `/gistpens/${path.params.slug}/`,
        };

        yield item;
      }
    },
    async *[ARCHIVE_SLUG](page) {
      const paths = await getGistpenArchivePaths();

      for (const path of paths) {
        /** @type {SitemapItem} */
        const item = {
          img: [],
          video: [],
          links: [],
          url: `/gistpens/page/${path.params.number}/`,
        };

        yield item;
      }
    },
  },
  talks: {
    async *[SINGLE_SLUG](page) {
      const paths = await getTalkArchivePaths();

      for (const path of paths) {
        /** @type {SitemapItem} */
        const item = {
          img: [],
          video: [],
          links: [],
          url: `/talks/${path.params.slug}/`,
        };

        yield item;
      }
    },
    async *[ARCHIVE_SLUG](page) {
      const paths = [''];

      for (const path of paths) {
        /** @type {SitemapItem} */
        const item = {
          img: [],
          video: [],
          links: [],
          url: `/talks/${path}`,
        };

        yield item;
      }
    },
  },
  async *[HOME_SLUG](page) {
    /** @type {SitemapItem} */
    const item = {
      img: [],
      video: [],
      links: [],
      url: `/`,
    };

    yield item;
  },
  /* these are intentionally empty */
  /* eslint-disable require-yield */
  async *[FIVE_HUNDRED_SLUG](page) {
    return;
  },
  async *[FOUR_OH_FOUR_SLUG](page) {
    return;
  },
  /* eslint-enable require-yield */
};

export async function* getAllSitemapItems() {
  for await (const page of getAllPages()) {
    if (!page._sys.basename.includes('__')) {
      yield pageToSitemapItem(page);
    } else {
      const [namespace, type] = page._sys.breadcrumbs;
      const mapper =
        type == null
          ? pageToSitemapMapper[namespace]
          : pageToSitemapMapper[namespace]?.[type];
      if (!mapper) throw new Error(`No mapper found for ${namespace}/${type}`);
      yield* mapper(page);
    }
  }
}
