require('dotenv').config({
  path: `.env`,
});

module.exports = {
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/src/data`,
      },
    },
    'gatsby-transformer-json',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-plugin-postcss',
    {
      resolve: 'gatsby-source-pocket',
      options: {
        consumerKey: process.env.POCKET_CONSUMER_KEY,
        accessToken: process.env.POCKET_ACCESS_TOKEN,
        weeksOfHistory: 1,
        apiMaxRecordsToReturn: 3000,
        getCurrentWeekOnly: `y`,
        stateFilterString: 'archive',
        tagFilter: false,
        favouriteFilter: false,
        searchFilter: false,
        domainFilter: false,
      },
    },
    {
      resolve: 'gatsby-source-wordpress',
      options: {
        baseUrl: 'reads.jamesdigioia.com',
        protocol: 'https',
        hostingWPCOM: false,
        useACF: false,
        includedRoutes: ['/pf/v1/stats/pf_posted'],
      },
    },
    {
      resolve: 'gatsby-source-wordpress',
      options: {
        baseUrl: 'jamesdigioia.com',
        protocol: 'https',
        hostingWPCOM: false,
        useACF: false,
        includedRoutes: [
          '/wp/v2/posts',
          '/wp/v2/pages',
          '/wp/v2/categories',
          '/wp/v2/tags',
          '/wp/v2/taxonomies',
          '/wp/v2/media',
          '/wp/v2/users',
          '/wp/v2/comments',
          '/intraxia/v1/gistpen/repos',
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-google-fonts',
      options: {
        fonts: ['Unica One', 'Vollkorn'],
      },
    },
  ],
};
