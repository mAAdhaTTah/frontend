import { Feed } from 'feed';
import { getAllVaultPages } from '@vault/server';

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
        url: page.frontmatter.essay?.featuredMedia.source,
        title: page.frontmatter.essay?.featuredMedia.title,
      });
  }

  if (page.frontmatter.gallery != null) {
    item.img.push(
      ...page.frontmatter.gallery?.images.map(val => ({
        url: val.source,
        title: val.title,
      })),
    );
  }

  if (page.frontmatter.image != null) {
    item.img.push({
      url: page.frontmatter.image?.media.source,
      title: page.frontmatter.image?.media.title,
    });
  }

  if (page.frontmatter.reference != null) {
    item.img.push({
      url: page.frontmatter.reference?.image,
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
  const { pages } = await getAllVaultPages();
  for (const page of pages) {
    yield pageToSitemapItem(page);
  }
}
