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
        verboseOutput: true,
        concurrentRequests: 10,
        perPage: 40,
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
        verboseOutput: true,
        concurrentRequests: 10,
        perPage: 40,
        includedRoutes: ['/pf/v1/stats/pf_posted'],
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
