const request = require('sync-request');
require('dotenv').config({
  path: `.env`,
});
const normalizer = require('./src/normalizer');

const {
  WP_API_DOMAIN = 'jamesdigioia.com',
  WP_API_USERNAME,
  WP_API_PASSWORD,
  POCKET_CONSUMER_KEY,
  POCKET_ACCESS_TOKEN,
} = process.env;

// @TODO(mAAdhaTTah) any way to do this to not need sync-request?
const wpMetaBody = request('GET', `https://${WP_API_DOMAIN}/wp-json/`).getBody(
  'utf-8'
);
const wpMeta = JSON.parse(wpMetaBody);

module.exports = {
  siteMetadata: {
    name: wpMeta.name,
    description: wpMeta.description,
    url: `https://${WP_API_DOMAIN}`,
  },
  plugins: [
    'gatsby-plugin-eslint',
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
      resolve: `gatsby-plugin-purgecss`,
      options: {
        printRejected: true,
        tailwind: true,
        develop: false,
      },
    },
    {
      resolve: 'gatsby-source-pocket',
      options: {
        consumerKey: POCKET_CONSUMER_KEY,
        accessToken: POCKET_ACCESS_TOKEN,
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
        baseUrl: `reads.${WP_API_DOMAIN}`,
        protocol: 'https',
        hostingWPCOM: false,
        useACF: false,
        includedRoutes: ['/pf/v1/stats/pf_posted'],
        normalizer,
      },
    },
    {
      resolve: 'gatsby-source-wordpress',
      options: {
        baseUrl: WP_API_DOMAIN,
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
          '/intraxia/v1/gistpen/repos',
        ],
        normalizer,
      },
    },
    {
      resolve: 'gatsby-source-apiserver',
      options: {
        url: `https://${WP_API_DOMAIN}/wp-json/intraxia/v1/gistpen/site`,
        name: "gistpenSite",
        auth: {
          username: WP_API_USERNAME,
          password: WP_API_PASSWORD
        },
      },
    },
    {
      resolve: 'gatsby-plugin-google-fonts',
      options: {
        fonts: ['Ovo', 'Muli'],
      },
    }
  ],
};
