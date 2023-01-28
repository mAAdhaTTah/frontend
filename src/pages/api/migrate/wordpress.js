import slugify from '@sindresorhus/slugify';
import parseLinkHeader from 'parse-link-header';
import { wp } from '@wp/api/wp';
import { gql, createClient } from 'tinacms';

const updateCommentMutation = gql`
  mutation updateComment($relativePath: String!, $params: CommentMutation!) {
    updateComment(relativePath: $relativePath, params: $params) {
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

const prettyPrint = x => JSON.stringify(x, null, '  ');

const plural = taxonomy => {
  switch (taxonomy) {
    case 'category':
      return 'categories';
    case 'post_tag':
    case 'tag':
      return 'tags';
    default:
      throw new Error(`unknown taxonomy ${taxonomy}`);
  }
};

const categoriesAndTags = async post => {
  return post._embedded['wp:term'].reduce(
    (results, terms) => {
      for (const term of terms) {
        results[plural(term.taxonomy)].push({
          reference: `content/${plural(term.taxonomy)}/${term.slug}.md`,
        });
      }
      return results;
    },
    {
      categories: [],
      tags: [],
    },
  );
};

const getPostParams = async post => ({
  [post.format]: await categoriesAndTags(post),
});

/** @type {import('next').NextApiHandler} */
const handler = async (_req, res) => {
  const tina = createClient({ isLocalClient: true });

  for await (const post of getAllForUrl(`/wp-json/wp/v2/posts`, {
    context: 'edit',
    status: 'publish',
    _embed: 'wp:term',
  })) {
    const slug = getSlugFromPost(post);
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
    _embed: 'wp:term',
  })) {
    const slug = getSlugFromPost(post);
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
    _embed: 'up,post',
  })) {
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
