import parseLinkHeader from 'parse-link-header';
import { wp } from '@wp/api/wp';
import { contentToChildren } from '@wp/migrate';
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

/** @type {import('next').NextApiHandler} */
const handler = async (_req, res) => {
  const tina = createClient({ isLocalClient: true });

  for await (const comment of getAllForUrl(`/wp-json/wp/v2/comments`, {
    context: 'edit',
    _embed: 'up,in-reply-to',
  })) {
    console.log(comment);
    await tina.request(updateCommentMutation, {
      variables: {
        relativePath: `${comment.id}.md`,
        params: {
          author: {
            name: comment.author_name,
            url: comment.author_url,
          },
          body: {
            type: 'root',
            children: contentToChildren(comment.content.rendered),
          },
          post: `content/posts/${comment._embedded.up[0].slug}.md`,
          parent: comment._embedded['in-reply-to']?.[0]
            ? `content/comments/${comment._embedded['in-reply-to'][0].id}.md`
            : null,
        },
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
