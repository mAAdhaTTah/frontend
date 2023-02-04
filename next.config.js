/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    domains: ['static.jamesdigioia.com'],
  },
  trailingSlash: true,
  async redirects() {
    const fs = require('fs/promises');
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
    ];
  },
  async rewrites() {
    return [
      {
        source: '/feed/',
        destination: '/feed/rss2.xml',
      },
      {
        source: '/feed/rss/',
        destination: '/feed/rss2.xml',
      },
      {
        source: '/feed/rss2/',
        destination: '/feed/rss2.xml',
      },
      {
        source: '/feed/atom/',
        destination: '/feed/atom.xml',
      },
      {
        source: '/feed/json/',
        destination: '/feed/json1.json',
      },
      {
        source: '/admin',
        destination: '/admin/index.html',
      },
    ];
  },
  experimental: {
    scrollRestoration: true,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};
