import { Feed } from 'feed';
import { parseISO } from 'date-fns';
import { getAllVaultPages, getRecentEssays } from '@vault/server';

/**
 * @typedef {import('sitemap').SitemapItem} SitemapItem
 */

const pageToSitemapItem = (
  /** @type {import("@vault/server").Page} */ page,
) => {
  /** @type {SitemapItem} */
  const item = {
    img: [],
    video: [],
    links: [],
    url: `/${page.frontmatter.web.slug}/`,
    lastmod: page.frontmatter.web.updated_at.toISOString(),
  };

  if (page.frontmatter.essay != null) {
    if (page.frontmatter.essay?.featuredMedia)
      item.img.push({
        url: page.frontmatter.essay?.featuredMedia,
        title: page.frontmatter.essay?.featuredMedia, // TODO
      });
  }

  if (page.frontmatter.gallery != null) {
    item.img.push(
      ...page.frontmatter.gallery?.images.map(val => ({
        url: val,
        title: val, // TODO
      })),
    );
  }

  if (page.frontmatter.image != null) {
    item.img.push({
      url: page.frontmatter.image?.media,
      title: page.frontmatter.image?.media, // TODO
    });
  }

  if (page.frontmatter.reference != null) {
    item.img.push({
      url: page.frontmatter.reference?.image,
      title: page.frontmatter.reference?.image, // TODO
    });
  }

  return item;
};

async function* getAllFeedItems() {
  const posts = await getRecentEssays();
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

export async function* getAllSitemapItems() {
  const { pages } = await getAllVaultPages();
  for (const page of pages) {
    yield pageToSitemapItem(page);
  }
}
