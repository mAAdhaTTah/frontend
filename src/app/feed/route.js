import { buildFeed } from '@vault/sitemap';

export async function GET() {
  const feed = await buildFeed();

  return new Response(feed.rss2(), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
