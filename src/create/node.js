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

const getOembed = async (linkUrl, reporter) => {
  try {
    const {
      WP_API_DOMAIN = 'jamesdigioia.com',
      WP_API_USERNAME,
      WP_API_PASSWORD,
    } = process.env;
    const { data } = await axios.get(
      `https://${WP_API_DOMAIN}/wp-json/oembed/1.0/proxy?url=${encodeURIComponent(
        linkUrl
      )}`,
      {
        headers: {
          Authorization: `Basic ${Buffer.from(
            `${WP_API_USERNAME}:${WP_API_PASSWORD}`,
            'binary'
          ).toString('base64')}`,
        },
      }
    );

    return data;
  } catch (e) {
    reporter.error(`Request failed for ${linkUrl}`, e);
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
