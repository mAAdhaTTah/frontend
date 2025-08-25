import * as url from 'url';
import fs from 'fs/promises';
import withPlaiceholder from '@plaiceholder/next';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

/** @type {import('next').NextConfig} */
const config = {
  // @TODO revert this when we upgrade spectacle
  reactStrictMode: false,
  // Timeout in seconds
  staticPageGenerationTimeout: 120,
  images: {
    domains: [
      'static.jamesdigioia.com',
      'www.poynter.org',
      '4.bp.blogspot.com',
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
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  transpilePackages: ['react-live'],
  webpack(config, context) {
    config.module.rules.push({
      test: /\.md$/,
      loader: 'raw-loader',
    });
    return config;
  },
};

export default withPlaiceholder(config);
