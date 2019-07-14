require('dotenv').config({
  path: `.env`,
});

module.exports = {
  siteMetadata: {
    title: 'James Reads',
    description: 'A Linkblog of my Daily Reading',
    keywords: 'James DiGioia',
  },
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
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'James Reads: A Linkblog of my Daily Reading',
        short_name: 'James Reads',
        start_url: '/',
        background_color: '#fff3c9',
        theme_color: '#78af52',
        display: 'minimal-ui',
        icon: 'src/images/avatar.jpg', // This path is relative to the root of the site.
      },
    },
    'gatsby-plugin-offline',
    'gatsby-plugin-postcss',
    {
      resolve: 'gatsby-source-pocket',
      options: {
        consumerKey: process.env.consumerKey,
        accessToken: process.env.accessToken,
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
          '/intraxia/v1/gistpen/repos',
          // @TODO(mAAdhaTTah) readd media – currently hanging while downloading
          // '/wp/v2/media',
          '/wp/v2/users',
          '/wp/v2/comments',
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
