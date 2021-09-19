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
    const feeds = [
      '/feed/',
      '/feed/rss/',
      '/feed/rss2/',
      '/feed/rdf/',
      '/feed/atom/',
    ];

    return [
      ...feeds.map(feed => ({
        source: feed,
        destination: `https://${process.env.NEXT_PUBLIC_WP_API_DOMAIN}${feed}`,
      })),
    ];
  },
  experimental: {
    scrollRestoration: true,
  },
};
