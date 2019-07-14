import { PageTemplateFragment } from '../fragments';

const PageTemplate = require.resolve(`../templates/Page.js`);

const GetPages = `
  query GetPages($skip: Int) {
    allWordpressPage(limit: 10, skip: $skip) {
      pageInfo {
        hasNextPage
      }
      edges {
        node {
          ...PageTemplateFragment
        }
      }
    }
  }

  ${PageTemplateFragment}
`;

const edgeToPage = ({ node }) => ({
  path: `/${node.slug}/`,
  component: PageTemplate,
  context: {
    page: node,
  },
});

const fetchPosts = async ({ graphql, page, pages = [] }) => {
  const {
    data: {
      allWordpressPage: {
        edges,
        pageInfo: { hasNextPage },
      },
    },
  } = await graphql(GetPages, { skip: (page - 1) * 10 });

  pages = [...pages, ...edges.map(edgeToPage)];

  return hasNextPage ? fetchPosts({ graphql, page: page + 1, pages }) : pages;
};

export default async ({ actions, graphql }) => {
  const { createPage } = actions;
  const pages = await fetchPosts({ graphql, page: 1 });

  pages.forEach(page => {
    createPage(page);
  });
};
