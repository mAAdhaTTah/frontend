import { PostTemplateFragment } from '../fragments';

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

const edgeToSinglePost = ({ node }) => ({
  path: `/${node.slug}/`,
  component: PostSingleTemplate,
  context: {
    post: node,
  },
});

const fetchPosts = async ({ graphql, page, pages }) => {
  const {
    data: {
      allWordpressPost: {
        edges,
        pageInfo: { hasNextPage },
      },
    },
  } = await graphql(GetPosts, { skip: (page - 1) * 10 });
  const ids = posts.map(({ node }) => node.id);

  pages = [
    ...pages,
    ...edges.map(edgeToSinglePost),
    {
      path: page === 1 ? '/writing/' : '/writing/page/' + page,
      component: PostArchiveTemplate,
      context: {
        ids,
        posts,
        page,
        hasNextPage,
      },
    },
  ];

  return hasNextPage ? fetchPosts({ graphql, page: page + 1, pages }) : pages;
};

export default async ({ actions, graphql }) => {
  const { createPage } = actions;
  const pages = await fetchPosts({ graphql, page: 1 });

  pages.forEach(page => {
    createPage(page);
  });
};
