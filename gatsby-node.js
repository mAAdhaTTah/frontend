/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
require = require('esm')(module);
const axios = require('axios');
const create = require(`./src/create`);
const onCreateNode = require('./src/create/node').onCreateNode;

exports.createSchemaCustomization = require('./src/create/schema').createSchemaCustomization;
exports.sourceNodes = require('./src/create/node').sourceNodes;
exports.createPages = async ({ actions, graphql }) => {
  await create.posts({ actions, graphql });
  await create.pages({ actions, graphql });
  await create.categories({ actions, graphql });
  await create.tags({ actions, graphql });
  await create.gistpens({ actions, graphql });
};

let providersP = null;

const getProviders = async () => {
  const response = await axios.get('https://oembed.com/providers.json');

  return response.data;
};

const getProviderEndpointForLinkUrl = (linkUrl, providers) => {
  let transformedEndpoint = {};

  for (const provider of providers || []) {
    for (const endpoint of provider.endpoints || []) {
      for (let schema of endpoint.schemes || []) {
        schema = schema.replace('*', '.*');
        const regExp = new RegExp(schema);
        if (regExp.test(linkUrl)) {
          transformedEndpoint.url = endpoint.url;
          transformedEndpoint.params = {
            url: linkUrl,
            ...provider.params,
          };
        }
      }
    }
  }

  return transformedEndpoint;
};

const getOembed = async (linkUrl, providers, reporter) => {
  const endpoint = getProviderEndpointForLinkUrl(linkUrl, providers);

  if (!endpoint.url) {
    reporter.error(`endpoint not found for url: ${linkUrl}`);
    return null;
  }

  try {
    const response = await axios.get(endpoint.url, {
      params: {
        format: 'json',
        ...endpoint.params,
      },
    });

    return response.data;
  } catch (e) {
    reporter.error(`Request failed for ${endpoint.url}`, e);
    return null;
  }
};

exports.onCreateNode = async args => {
  await onCreateNode(args);

  const { node, actions, reporter } = args;
  const { createNodeField } = actions;

  if (node.internal.type !== 'wordpress__POST') {
    return;
  }

  if (providersP == null) {
    providersP = getProviders();
  }

  const providers = await providersP;

  const {
    _format_audio_embed: audioUrl,
    _format_video_embed: videoUrl,
  } = node.meta;

  const name = 'oembed';
  const value = {
    audio: audioUrl ? await getOembed(audioUrl, providers, reporter) : null,
    video: videoUrl ? await getOembed(videoUrl, providers, reporter) : null,
  };

  createNodeField({ node, name, value });
};
