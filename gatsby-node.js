/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
require = require('esm')(module);
const create = require(`./src/create`);

exports.createPages = async ({ actions, graphql }) => {
  await create.posts({ actions, graphql });
};
