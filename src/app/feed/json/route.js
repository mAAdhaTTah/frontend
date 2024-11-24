import { buildFeed } from '@vault/sitemap';

export async function GET() {
  const feed = await buildFeed();

  return new Response(feed.json1(), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
}
