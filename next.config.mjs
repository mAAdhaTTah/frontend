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
    const files = await fs.readdir(`${__dirname}/content/posts`);
    return [
      ...files.map(file => {
        const basename = file.replace('.md', '');
        return {
          source: `/${basename}/`,
          destination: `/writing/${basename}/`,
          permanent: true,
        };
      }),
      {
        source: '/gistpens/page/',
        destination: '/gistpens/',
        permanent: true,
      },
      {
        source: '/gistpens/page/1/',
        destination: '/gistpens/',
        permanent: true,
      },
      {
        source: '/writing/page/',
        destination: '/writing/',
        permanent: true,
      },
      {
        source: '/writing/page/1/',
        destination: '/writing/',
        permanent: true,
      },
      {
        source: '/feed/rss/',
        destination: '/feed/',
        permanent: true,
      },
      {
        source: '/feed/rss2/',
        destination: '/feed/',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'talks.jamesdigioia.com',
          },
        ],
        destination: 'https://jamesdigioia.com/talks/:path*',
        permanent: false,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/admin',
        destination: '/admin/index.html',
      },
    ];
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
