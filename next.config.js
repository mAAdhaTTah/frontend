/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    domains: ['static.jamesdigioia.com'],
  },
  trailingSlash: true,
  async redirects() {
    return [
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
};
