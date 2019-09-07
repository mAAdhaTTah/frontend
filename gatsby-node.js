/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
require = require('esm')(module);
const create = require(`./src/create`);

exports.createSchemaCustomization = create.createSchemaCustomization;
exports.sourceNodes = create.sourceNodes;
exports.createPages = async args => {
  await create.posts(args);
  await create.pages(args);
  await create.categories(args);
  await create.tags(args);
  await create.gistpens(args);
};
exports.onCreateNode = create.onCreateNode;
