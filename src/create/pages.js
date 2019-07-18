import { PageTemplateFragment } from '../fragments';
import creator from './creator';

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

const modify = ({
  data: {
    allWordpressPage: {
      edges,
      pageInfo: { hasNextPage },
    },
  },
}) => ({
  add: edges
    .filter(({ node }) => node.slug !== 'writing')
    .map(({ node }) => ({
      path: `/${node.slug}/`,
      component: PageTemplate,
      context: {
        page: node,
      },
    })),
  hasNextPage,
});

export default creator(GetPages, modify);
