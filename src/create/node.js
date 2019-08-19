const { startOfDay, parse, subDays, isBefore } = require('date-fns');
const crypto = require('crypto');

// @TODO(mAAdhaTTah) include all and paginate
const earliest = startOfDay(subDays(new Date(), 7));
const isIncluded = readAt => isBefore(earliest, readAt);

exports.sourceNodes = async ({ node, actions, createNodeId, reporter }) => {
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

exports.onCreateNode = async ({ node, actions, createNodeId, reporter }) => {
  const { createNode, touchNode } = actions;

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
    }

    if (id != null) {
      await touchNode({ nodeId: id });
    }
  } catch (e) {
    reporter.panicOnBuild(`Failed to build links`, e);
  }
};
