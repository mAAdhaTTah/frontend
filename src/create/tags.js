import { TagTemplateFragment } from '../fragments';
import creator from './creator';

const TagTemplate = require.resolve(`../templates/Tag.js`);

const GetTags = `
  query GetTags($skip: Int) {
    allWordpressTag(limit: 10, skip: $skip) {
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

  ${TagTemplateFragment}
`;

const modify = ({
  results: {
    data: {
      allWordpressTag: {
        edges,
        pageInfo: { hasNextPage },
      },
    },
  },
}) => ({
  add: edges.map(({ node }) => ({
    path: `/tag/${node.slug}/`,
    component: TagTemplate,
    context: {
      tag: node,
    },
  })),
  hasNextPage,
});

export default creator(GetTags, modify);
