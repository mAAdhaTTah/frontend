import * as url from 'url';
import fs from 'fs/promises';
import withPlaiceholder from '@plaiceholder/next';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

/** @type {import('next').NextConfig} */
const config = {
  // Timeout in seconds
  staticPageGenerationTimeout: 120,
  cacheComponents: true,
  images: {
    remotePatterns: [
      new URL('https://static.jamesdigioia.com/**'),
      new URL('https://www.poynter.org/**'),
      new URL('https://4.bp.blogspot.com/**'),
      new URL('https://i.ytimg.com/**'),
    ],
  },
  trailingSlash: true,
  async redirects() {
    const redirects = await fs.readFile(`${__dirname}/redirects.json`, 'utf-8');
    return JSON.parse(redirects);
  },
  experimental: {
    scrollRestoration: true,
    webpackBuildWorker: true,
  },
};

export default withPlaiceholder(config);
