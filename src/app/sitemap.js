import { getAllSitemapItems } from '@tina/sitemap';

export default async function Sitemap() {
  const items = [];
  for await (const item of getAllSitemapItems()) {
    items.push({ ...item, url: `https://jamesdigioia.com${item.url}` });
  }
  return items;
}
