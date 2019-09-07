import { startOfDay, parse, subDays, isBefore } from 'date-fns';
import crypto from 'crypto';
import axios from 'axios';

// @TODO(mAAdhaTTah) include all and paginate
const earliest = startOfDay(subDays(new Date(), 7));
const isIncluded = readAt => isBefore(earliest, readAt);

export const sourceNodes = async ({
  node,
  actions,
  createNodeId,
  reporter,
}) => {
  const { createNode, touchNode } = actions;
  const today = startOfDay(new Date());
  const days = [today];

  while (days.length < 7) {
    days.push(subDays(today, days.length));
  }

  try {
    await Promise.all(
      days.map(async day => {
        const id = createNodeId(`daynode-${day}`);

        await createNode({
          id,
          day,
          internal: {
            type: 'ReadDay',
            contentDigest: crypto
              .createHash(`md5`)
              .update(`daynode-${day}`)
              .digest(`hex`),
          },
        });

        await touchNode({ nodeId: id });
      })
    );
  } catch (e) {
    reporter.panicOnBuild(`Failed to build links`, e);
  }
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

const getOembed = async (linkUrl, reporter) => {
  const providers = await providersP;
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

export const onCreateNode = async ({
  node,
  actions,
  createNodeId,
  reporter,
}) => {
  const { createNode, touchNode, createNodeField } = actions;

  try {
    let id, readAt;

    switch (node.internal.type) {
      case 'PocketArticle':
        readAt = new Date(+node.time_read * 1000);

        if (!isIncluded(readAt)) {
          return;
        }

        id = createNodeId(`${node.id}-ReadLink-Pocket`);

        await createNode({
          id,
          url: node.url,
          title: node.title,
          excerpt: node.excerpt,
          readAt,
          dayOf: startOfDay(readAt),
          internal: {
            type: 'ReadLink',
            contentDigest: crypto
              .createHash(`md5`)
              .update(JSON.stringify(node))
              .digest(`hex`),
          },
        });
        break;
      case 'wordpress__pf_pf_posted':
        readAt = parse(node.post_date);

        if (!isIncluded(readAt)) {
          return;
        }

        id = createNodeId(`${node.id}-ReadLink-PFPosted`);

        await createNode({
          id,
          url: node.item_link,
          title: node.post_title,
          excerpt: node.stripped_post_content,
          readAt,
          dayOf: startOfDay(readAt),
          internal: {
            type: 'ReadLink',
            contentDigest: crypto
              .createHash(`md5`)
              .update(JSON.stringify(node))
              .digest(`hex`),
          },
        });
        break;
      case 'wordpress__POST':
        if (providersP == null) {
          providersP = getProviders();
        }

        const {
          _format_audio_embed: audioUrl,
          _format_video_embed: videoUrl,
        } = node.meta;

        const name = 'oembed';
        const value = {
          audio: audioUrl ? await getOembed(audioUrl, reporter) : null,
          video: videoUrl ? await getOembed(videoUrl, reporter) : null,
        };

        createNodeField({ node, name, value });
        return;
      default:
        return;
    }

    await touchNode({ nodeId: id });
  } catch (e) {
    reporter.panicOnBuild(`Failed to build links`, e);
  }
};
