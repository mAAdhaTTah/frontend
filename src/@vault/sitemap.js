import { Feed } from 'feed';
import { getAllVaultPages, readAllVaultPages } from '@vault/server';

/**
 * @typedef {import('next').MetadataRoute.Sitemap[number]} SitemapItem
 */

const sourceToSitemapItem = (
  /** @type {import("@vault/server").Source} */ { frontmatter },
) => {
  /** @type {string[]} */
  const images = [];

  if (frontmatter.essay?.featuredMedia) {
    images.push(frontmatter.essay.featuredMedia.source);
  }

  if (frontmatter.gallery != null) {
    images.push(...frontmatter.gallery.images.map(val => val.source));
  }

  if (frontmatter.image != null) {
    images.push(frontmatter.image.media.source);
  }

  if (frontmatter.reference?.image != null) {
    images.push(frontmatter.reference.image);
  }

  /** @type {SitemapItem} */
  const item = {
    url: `/${frontmatter.web.slug}/`,
    lastModified: frontmatter.web.updated_at,
    images,
  };

  return item;
};

async function* getAllFeedItems() {
  const { pages } = await getAllVaultPages();
  for (const page of pages) {
    if (page.frontmatter.essay) {
      /** @type {import('feed').Item} */
      const item = {
        title: page.frontmatter.web.title,
        link: `https://jamesdigioia.com/${page.frontmatter.web.slug}`,
        date: page.frontmatter.web.published_at,
      };
      yield item;
    }
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
  const { sources } = await readAllVaultPages();
  for (const source of sources) {
    yield sourceToSitemapItem(source);
  }
}
