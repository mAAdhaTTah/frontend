import { Feed } from 'feed';
import { getAllVaultPages, readAllVaultPages } from '@vault/server';

/**
 * @typedef {import('sitemap').SitemapItem} SitemapItem
 */

const sourceToSitemapItem = (
  /** @type {import("@vault/server").Source} */ { frontmatter },
) => {
  /** @type {SitemapItem} */
  const item = {
    img: [],
    video: [],
    links: [],
    url: `/${frontmatter.web.slug}/`,
    lastmod: frontmatter.web.updated_at.toISOString(),
  };

  if (frontmatter.essay != null) {
    if (frontmatter.essay?.featuredMedia)
      item.img.push({
        url: frontmatter.essay?.featuredMedia.source,
        title: frontmatter.essay?.featuredMedia.title,
      });
  }

  if (frontmatter.gallery != null) {
    item.img.push(
      ...frontmatter.gallery?.images.map(val => ({
        url: val.source,
        title: val.title,
      })),
    );
  }

  if (frontmatter.image != null) {
    item.img.push({
      url: frontmatter.image.media.source,
      title: frontmatter.image.media.title,
    });
  }

  if (frontmatter.reference != null && frontmatter.reference.image != null) {
    item.img.push({
      url: frontmatter.reference.image,
      title: 'Article cover',
    });
  }

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
