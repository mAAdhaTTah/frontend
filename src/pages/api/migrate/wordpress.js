import slugify from '@sindresorhus/slugify';
import { parseMDX } from '@tinacms/mdx';
import parseLinkHeader from 'parse-link-header';
import { wp } from '@wp/api/wp';
import { gql, createClient } from 'tinacms';
import { remark } from 'remark';
import remarkInlineLinks from 'remark-inline-links';
import remarkFootnotes from 'remark-footnotes';
import { mdxToMarkdown } from 'mdast-util-mdx';
import { visit, SKIP } from 'unist-util-visit';
import { mdxJsx } from 'micromark-extension-mdx-jsx';
import { contentToChildren } from '@wp/migrate';
import { contentField } from '../../../../.tina/collections/post';

const createPendingRepoMutation = gql`
  mutation addPendingRepo($relativePath: String!) {
    addPendingDocument(collection: "repo", relativePath: $relativePath) {
      ... on Document {
        id
      }
    }
  }
`;

const updateRepoMutation = gql`
  mutation updateRepo($relativePath: String!, $params: RepoMutation!) {
    updateRepo(relativePath: $relativePath, params: $params) {
      ... on Document {
        id
      }
    }
  }
`;

const createPendingMediaMutation = gql`
  mutation addPendingMedia($relativePath: String!) {
    addPendingDocument(collection: "media", relativePath: $relativePath) {
      ... on Document {
        id
      }
    }
  }
`;

const updateMediaMutation = gql`
  mutation updateMedia($relativePath: String!, $params: MediaMutation!) {
    updateMedia(relativePath: $relativePath, params: $params) {
      ... on Document {
        id
      }
    }
  }
`;

const createPendingTagMutation = gql`
  mutation addPendingTag($relativePath: String!) {
    addPendingDocument(collection: "tag", relativePath: $relativePath) {
      ... on Document {
        id
      }
    }
  }
`;

const updateTagMutation = gql`
  mutation updateTag($relativePath: String!, $params: TagMutation!) {
    updateTag(relativePath: $relativePath, params: $params) {
      ... on Document {
        id
      }
    }
  }
`;

const createPendingCommentMutation = gql`
  mutation addPendingComment($relativePath: String!) {
    addPendingDocument(collection: "comment", relativePath: $relativePath) {
      ... on Document {
        id
      }
    }
  }
`;

const updateCommentMutation = gql`
  mutation updateComment($relativePath: String!, $params: CommentMutation!) {
    updateComment(relativePath: $relativePath, params: $params) {
      ... on Document {
        id
      }
    }
  }
`;

const createPendingCategoryMutation = gql`
  mutation addPendingCategory($relativePath: String!) {
    addPendingDocument(collection: "category", relativePath: $relativePath) {
      ... on Document {
        id
      }
    }
  }
`;

const updateCategoryMutation = gql`
  mutation updateCategory($relativePath: String!, $params: CategoryMutation!) {
    updateCategory(relativePath: $relativePath, params: $params) {
      ... on Document {
        id
      }
    }
  }
`;

const createPendingPostMutation = gql`
  mutation addPendingPost($relativePath: String!, $template: String!) {
    addPendingDocument(
      collection: "post"
      relativePath: $relativePath
      template: $template
    ) {
      ... on Document {
        id
      }
    }
  }
`;

const updatePostMutation = gql`
  mutation updatePost($relativePath: String!, $params: PostMutation!) {
    updatePost(relativePath: $relativePath, params: $params) {
      ... on Document {
        id
      }
    }
  }
`;

async function* getAllForUrl(url, params = {}, page = 1) {
  const { data: posts, headers } = await wp.get(url, {
    params: {
      ...params,
      per_page: 100,
      page,
    },
  });

  yield* posts;

  if (parseLinkHeader(headers['link'])?.next) {
    yield* await getAllForUrl(url, params, page + 1);
  }
}

const getSlugFromPost = post => post.slug || slugify(post.title.raw);

const baseProps = post => ({
  publishedAt: post.date,
  updatedAt: post.modified,
  status: post.status,
});

const blockContentMap = {
  'intraxia/gistpen': async block => {
    const { data: repo } = await wp.get(
      `/wp-json/intraxia/v1/gistpen/repos/${block.attrs.repoId}`,
    );
    const { data: blob } = await wp.get(
      `/wp-json/intraxia/v1/gistpen/repos/${block.attrs.repoId}/blobs/${block.attrs.blobId}`,
    );
    return {
      gistpenEmbed: {
        repo: `content/repos/${repo.slug}.md`,
        blob: blob.filename,
        highlight: block.attrs.highlight,
        offset: block.attrs.offset,
      },
    };
  },
};

const blockRichTextMap = {
  'core/paragraph': block => ({
    type: 'p',
    children: contentToChildren(block.attrs.content),
  }),
  'core/heading': block => ({
    type: `h${block.attrs.level}`,
    children: contentToChildren(block.attrs.content),
  }),
  'core/list': block => ({
    type: block.attrs.ordered ? 'ol' : 'ul',
    children: contentToChildren(block.attrs.values),
  }),
  'core/code': block => ({
    type: 'code_block',
    lang: 'javascript', // TODO probably
    children: block.attrs.content.split('\n').map(line => ({
      type: 'code_line',
      children: [{ type: 'text', text: line }],
    })),
  }),
  'core/quote': block => ({
    type: 'mdxJsxFlowElement',
    name: 'ExtendedQuote',
    props: {
      children: {
        type: 'root',
        children: contentToChildren(block.attrs.value),
      },
      citation: block.attrs.citation,
    },
  }),
  'core/image': block => ({
    type: 'mdxJsxFlowElement',
    name: 'Figure',
    props: {
      url: block.attrs.url,
      altText: block.attrs.alt,
      caption: block.attrs.caption,
      linkTarget: block.attrs.href,
    },
  }),
  'core-embed/twitter': block => ({
    type: 'mdxJsxFlowElement',
    name: 'Embed',
    props: {
      url: block.attrs.url,
      provider: block.attrs.providerNameSlug,
    },
  }),
};

const prettyPrint = x => JSON.stringify(x, null, '  ');

const throwMissingBlockError = block => {
  throw new Error(`Missing block ${block.blockName}
  
${prettyPrint(block)}`);
};

const embedShortcode = /\[embed\](.*)\[\/embed\]/;

/**
 * @param {string} markdown
 */
const processMarkdown = async markdown => {
  markdown = markdown.replaceAll('\r\n', '\n');
  // Strip more comment, only used in WordPress
  markdown = markdown.replace('<!--more-->', '');
  // Convert single dash to emdash.
  markdown = markdown.replaceAll(' - ', ' -- ');
  // Fix URL title
  markdown = markdown.replace(
    `"Don't Call New York Senator Kirsten Gillibrand "Girlie""`,
    `"Don't Call New York Senator Kirsten Gillibrand \\"Girlie\\""`,
  );
  // Replace emoticons with emojis
  markdown = markdown.replaceAll(':-)', '🙂');
  // Fix link content
  markdown = markdown.replace(
    '[https://blog.rangle.io/styling-with-functional-css/]',
    '[Styling with Functional CSS]',
  );
  // This doesn't parse correctly, so we're going to remove & readd
  markdown = markdown.replace(
    'WordPress<-->GitHub Sync',
    'WordPress-GitHub Sync',
  );
  markdown = markdown.replace(
    'WordPress <--> GitHub Sync',
    'WordPress-GitHub Sync',
  );
  // Remove weird hard breaks
  markdown = markdown.replace(
    'preview in \n\n[VirtualBox][2]',
    'preview in [VirtualBox][2]',
  );
  const file = await remark()
    .use(remarkInlineLinks)
    .use(remarkFootnotes)
    .use(function remarkInlineFootnotes(options = {}) {
      const data = this.data();

      add('micromarkExtensions', mdxJsx(options));
      add('toMarkdownExtensions', mdxToMarkdown(options));

      /**
       * @param {string} field
       * @param {unknown} value
       */
      function add(field, value) {
        const list = /** @type {Array<unknown>} */ (
          // Other extensions
          /* c8 ignore next 2 */
          data[field] ? data[field] : (data[field] = [])
        );

        list.push(value);
      }

      return tree => {
        visit(tree, 'footnoteDefinition', (node, index, parent) => {
          if (parent !== null && typeof index === 'number') {
            const replacement = {
              type: 'mdxJsxFlowElement',
              name: 'FootnoteDefinition',
              attributes: [
                {
                  type: 'mdxJsxAttribute',
                  name: 'id',
                  value: node.identifier,
                },
              ],
              children: node.children,
            };

            parent.children[index] = replacement;
            return [SKIP, index];
          }
        });

        visit(tree, 'footnoteReference', (node, index, parent) => {
          if (parent !== null && typeof index === 'number') {
            const replacement = {
              type: 'mdxJsxTextElement',
              name: 'FootnoteReference',
              attributes: [
                {
                  type: 'mdxJsxAttribute',
                  name: 'id',
                  value: node.identifier,
                },
              ],
            };

            parent.children[index] = replacement;
            return [SKIP, index];
          }
        });

        visit(tree, 'blockquote', (node, index, parent) => {
          if (parent !== null && typeof index === 'number') {
            const replacement = {
              type: 'mdxJsxFlowElement',
              name: 'ExtendedQuote',
              children: node.children,
              attributes: [],
            };

            parent.children[index] = replacement;
            return [SKIP, index];
          }
        });
      };
    })
    .process(markdown);
  markdown = file.toString();

  return markdown;
};

/**
 * @param {string} shortcode
 */
const createEmbed = shortcode => {
  const [, url] = shortcode.match(embedShortcode);

  return {
    type: 'mdxJsxFlowElement',
    name: 'Embed',
    props: {
      url,
      provider: 'twitter', // TODO
    },
  };
};

const mapBody = async post => {
  const body = [];
  let lastRichText = null;
  const setupRichText = () => {
    if (lastRichText == null) {
      lastRichText = {
        type: 'root',
        children: [],
      };
      body.push({
        richText: {
          content: lastRichText,
        },
      });
    }
  };

  const processElement = async element => {
    if (Array.isArray(element.children)) {
      let nextElement = {
        ...element,
        children: [],
      };
      for (const child of element.children) {
        if (child.type === 'text') {
          if (embedShortcode.test(child.text)) {
            if (nextElement.children.length) {
              lastRichText.children.push(nextElement);
            }
            lastRichText.children.push(createEmbed(child.text));
            nextElement = {
              ...element,
              children: [],
            };
          } else {
            nextElement.children.push(child);
          }
        } else {
          nextElement.children.push(child);
        }
      }

      lastRichText.children.push(nextElement);
    } else {
      lastRichText.children.push(element);
    }
  };

  if (post.has_blocks) {
    for (const block of post.blocks) {
      if (block.blockName in blockRichTextMap) {
        setupRichText();
        const element =
          (await blockRichTextMap[block.blockName]?.(block)) ??
          throwMissingBlockError(block);
        await processElement(element);
      } else {
        // Reset it so we create a new rich text for the next block
        lastRichText = null;
        const element =
          (await blockContentMap[block.blockName]?.(block)) ??
          throwMissingBlockError(block);
        body.push(element);
      }
    }
  } else if (post.markdown) {
    setupRichText();
    const processedMarkdown = await processMarkdown(post.markdown);
    const markdownRootElement = parseMDX(
      processedMarkdown,
      contentField,
      str => str,
    );

    if (markdownRootElement.children[0].type === 'invalid_markdown') {
      throw new Error(
        `Failed to parse to Tina MDX, error: ${markdownRootElement.children[0].message}\n\nMarkdown:\n\n${processedMarkdown}`,
      );
    }

    for (const element of markdownRootElement.children) {
      await processElement(element);
    }
  } else {
    setupRichText();
    lastRichText.children = contentToChildren(post.content.rendered);
  }

  return body;
};

const postParamsMap = {
  standard: async post => ({
    title: post.title.raw,
    body: await mapBody(post),
    excerpt: {
      type: 'root',
      children: contentToChildren(post.excerpt.rendered),
    },
    featuredMedia: await getFeaturedMedia(post),
    header: 'content/headers/main.md',
    menu: 'content/menus/main.md',
  }),
  status: async post => ({
    body: await mapBody(post),
  }),
  aside: async post => ({
    body: await mapBody(post),
  }),
  audio: async post => ({
    title: post.title.raw,
    audio: {
      url: post.meta._format_audio_embed,
    },
    body: await mapBody(post),
  }),
  link: async post => ({
    title: post.title.raw,
    body: await mapBody(post),
    link: {
      url: post.meta._format_link_url,
    },
  }),
  quote: async post => ({
    title: post.title.raw,
    body: await mapBody(post),
    source: {
      url: post.meta._format_quote_source_url,
      name: post.meta._format_quote_source_name,
    },
  }),
  video: async post => ({
    title: post.title.raw,
    video: {
      url: post.meta._format_video_embed,
    },
    body: await mapBody(post),
  }),
  image: async post => ({
    title: post.title.raw,
    featuredMedia: await getFeaturedMedia(post),
    body: await mapBody(post),
  }),
  gallery: async post => {
    const { data } = await wp.get(post._links['wp:attachment'][0].href, {
      params: { per_page: 100 },
    });

    return {
      title: post.title.raw,
      images: data.map(image => ({
        reference: `content/media/${image.slug}.md`,
      })),
      body: await mapBody(post),
    };
  },
};

const throwMissingFormatError = post => {
  throw new Error(`Missing format ${post.format}

${prettyPrint(post)}`);
};

const getPostParams = async post => ({
  [post.format]: {
    ...baseProps(post),
    ...((await postParamsMap[post.format]?.(post)) ??
      throwMissingFormatError(post)),
  },
});

const getFeaturedMedia = async post => {
  let featuredMedia = null;

  if (post.featured_media) {
    const { data: image } = await wp.get(
      `/wp-json/wp/v2/media/${post.featured_media}`,
    );
    featuredMedia = `content/media/${image.slug}.md`;
  }
  return featuredMedia;
};

/** @type {import('next').NextApiHandler} */
const handler = async (_req, res) => {
  const tina = createClient({ isLocalClient: true });

  for await (const repo of getAllForUrl(`/wp-json/intraxia/v1/gistpen/repos`)) {
    const { data: commits } = await wp.get(
      `/wp-json/intraxia/v1/gistpen/repos/${repo.ID}/commits`,
    );
    await tina
      .request(createPendingRepoMutation, {
        variables: {
          relativePath: `${repo.slug}.md`,
        },
      })
      .catch(() => {});
    await tina.request(updateRepoMutation, {
      variables: {
        relativePath: `${repo.slug}.md`,
        params: {
          description: repo.description,
          status: repo.status,
          gistId: repo.gist_id,
          sync: repo.sync === 'on',
          createdAt: repo.created_at.replace(' ', 'T') + '.000Z',
          updatedAt: repo.updated_at.replace(' ', 'T') + '.000Z',
          blobs: repo.blobs.map(blob => ({
            filename: blob.filename,
            code: blob.code,
            language: blob.language.slug,
          })),
          commits: commits.map(commit => ({
            committedAt: commit.committed_at,
            description: commit.description,
            blobs: commit.states.map(state => ({
              filename: state.filename,
              code: state.code,
              language: state.language.slug,
            })),
          })),
        },
      },
    });
  }

  for await (const media of getAllForUrl(`/wp-json/wp/v2/media`)) {
    await tina
      .request(createPendingMediaMutation, {
        variables: {
          relativePath: `${media.slug}.md`,
        },
      })
      .catch(() => {});
    await tina.request(updateMediaMutation, {
      variables: {
        relativePath: `${media.slug}.md`,
        params: {
          title: media.title.rendered,
          source: media.source_url,
          altText: media.alt_text,
          caption: media.caption.rendered,
        },
      },
    });
  }

  for await (const tag of getAllForUrl(`/wp-json/wp/v2/tags`)) {
    await tina
      .request(createPendingTagMutation, {
        variables: {
          relativePath: `${tag.slug}.md`,
        },
      })
      .catch(() => {});
    await tina.request(updateTagMutation, {
      variables: {
        relativePath: `${tag.slug}.md`,
        params: {
          name: tag.name,
          description: tag.description,
        },
      },
    });
  }

  for await (const category of getAllForUrl(`/wp-json/wp/v2/categories`, {
    _embed: 'up',
  })) {
    await tina
      .request(createPendingCategoryMutation, {
        variables: {
          relativePath: `${category.slug}.md`,
        },
      })
      .catch(() => {});
    await tina.request(updateCategoryMutation, {
      variables: {
        relativePath: `${category.slug}.md`,
        params: {
          name: category.name,
          description: category.description,
          parent:
            category.parent === 0
              ? null
              : `content/category/${category._embedded.up[0].slug}.md`,
        },
      },
    });
  }

  for await (const post of getAllForUrl(`/wp-json/wp/v2/posts`, {
    context: 'edit',
    status: 'publish',
  })) {
    const slug = getSlugFromPost(post);
    await tina
      .request(createPendingPostMutation, {
        variables: {
          relativePath: `${slug}.md`,
          template: post.format,
        },
      })
      .catch(() => {});
    const params = await getPostParams(post);
    await tina
      .request(updatePostMutation, {
        variables: {
          relativePath: `${slug}.md`,
          params,
        },
      })
      .catch(err => {
        console.log(prettyPrint(params));
        throw err;
      });
  }

  for await (const post of getAllForUrl(`/wp-json/wp/v2/posts`, {
    context: 'edit',
    status: 'draft',
  })) {
    const slug = getSlugFromPost(post);
    await tina
      .request(createPendingPostMutation, {
        variables: {
          relativePath: `${slug}.md`,
          template: post.format,
        },
      })
      .catch(() => {});
    const params = await getPostParams(post);
    await tina
      .request(updatePostMutation, {
        variables: {
          relativePath: `${slug}.md`,
          params,
        },
      })
      .catch(err => {
        console.log(prettyPrint(params));
        throw err;
      });
  }

  for await (const comment of getAllForUrl(`/wp-json/wp/v2/comments`, {
    _embed: 'up',
  })) {
    await tina
      .request(createPendingCommentMutation, {
        variables: {
          relativePath: `${comment.id}.md`,
        },
      })
      .catch(() => {});
    await tina.request(updateCommentMutation, {
      variables: {
        relativePath: `${comment.id}.md`,
        params: {},
      },
    });
  }

  return res.json({ success: true });
};

/** @type {import('next').NextApiHandler} */
export default async (req, res) => {
  if (process.env.NODE_ENV === 'production') {
    return res.status(404).json({
      success: false,
      message: 'Not found',
    });
  }

  try {
    return await handler(req, res);
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ success: false, message: err.message, stack: err.stack });
  }
};
