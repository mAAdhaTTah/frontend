import { CategoryTemplateFragment } from '../fragments';
import creator from './creator';

const CategoryTemplate = require.resolve(`../templates/Category.js`);

const GetCategories = `
  query GetCategories($skip: Int) {
    allWordpressCategory(limit: 10, skip: $skip) {
      pageInfo {
        hasNextPage
      }
      edges {
        node {
          ...CategoryTemplateFragment
        }
      }
    }
  }

  ${CategoryTemplateFragment}
`;

const modify = ({
  data: {
    allWordpressCategory: {
      edges,
      pageInfo: { hasNextPage },
    },
  },
}) => ({
  add: edges.map(({ node }) => ({
    path: `/category/${node.slug}/`,
    component: CategoryTemplate,
    context: {
      category: node,
    },
  })),
  hasNextPage,
});

export default creator(GetCategories, modify);
