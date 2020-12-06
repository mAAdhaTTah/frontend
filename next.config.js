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
    ];
  },
};
