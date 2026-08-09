import * as url from 'url';
import fs from 'fs/promises';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

/** @type {import('next').NextConfig} */
const config = {
  cacheComponents: true,
  images: {
    remotePatterns: [
      new URL('https://static.jamesdigioia.com/**'),
      new URL('https://www.poynter.org/**'),
      new URL('https://4.bp.blogspot.com/**'),
      new URL('https://i.ytimg.com/**'),
      new URL('https://opengraph.githubassets.com/**'),
    ],
  },
  trailingSlash: true,
  async redirects() {
    const redirects = await fs.readFile(`${__dirname}/redirects.json`, 'utf-8');
    return JSON.parse(redirects);
  },
  turbopack: {
    // Turbopack gives `?raw` no built-in meaning; the rule supplies it.
    // `bytes` rather than the documented `text`, which this build rejects.
    rules: {
      './vault/**/*.md': { condition: { query: '?raw' }, type: 'bytes' },
    },
  },
  experimental: {
    scrollRestoration: true,
  },
};

export default config;
