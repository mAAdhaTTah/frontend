import { PostTemplateFragment } from '../fragments';
import creator from './creator';

const PostSingleTemplate = require.resolve(`../templates/Post/Single.js`);
const PostArchiveTemplate = require.resolve(`../templates/Post/Archive.js`);

const GetPosts = `
  query GetPosts($skip: Int) {
    allWordpressPost(limit: 10, skip: $skip) {
      pageInfo {
        hasNextPage
      }
      edges {
        node {
          ...PostTemplateFragment
        }
      }
    }
  }

  ${PostTemplateFragment}
`;

const modify = (
  {
    data: {
      allWordpressPost: {
        edges,
        pageInfo: { hasNextPage },
      },
    },
  },
  { page }
) => ({
  add: edges
    .map(({ node }) => ({
      path: `/${node.slug}/`,
      component: PostSingleTemplate,
      context: {
        post: node,
      },
    }))
    .concat({
      path: page === 1 ? '/writing/' : '/writing/page/' + page,
      component: PostArchiveTemplate,
      context: {
        ids: edges.map(({ node }) => node.id),
        posts: edges,
        pageNumber: page,
        hasNextPage,
      },
    }),
  hasNextPage,
});

export default creator(GetPosts, modify);

async ({ actions, graphql }) => {
  const { createPage } = actions;
  const pages = await fetchPosts({ graphql, page: 1 });

  pages.forEach(page => {
    createPage(page);
  });
};
