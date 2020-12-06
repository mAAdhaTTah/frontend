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
};
