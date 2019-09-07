import { GistpenTemplateFragment } from '../fragments';
import creator from './creator';

const GistpenSingleTemplate = require.resolve(`../templates/Gistpen/Single.js`);
const GistpenArchiveTemplate = require.resolve(
  `../templates/Gistpen/Archive.js`
);

const GetGistpens = `
  query GetGistpens($skip: Int) {
    allWordpressIntraxiaRepos(limit: 10, skip: $skip) {
      pageInfo {
        hasNextPage
      }
      edges {
        node {
          ...GistpenTemplateFragment
        }
      }
    }
  }

  ${GistpenTemplateFragment}
`;

const modify = ({
  results: {
    data: {
      allWordpressIntraxiaRepos: {
        edges,
        pageInfo: { hasNextPage },
      },
    },
  },
  page,
}) => ({
  add: edges
    .map(({ node }) => ({
      path: `/gistpens/${node.description}/`,
      component: GistpenSingleTemplate,
      context: {
        post: node,
      },
    }))
    .concat({
      path: page === 1 ? '/gistpens/' : '/gistpens/page/' + page,
      component: GistpenArchiveTemplate,
      context: {
        ids: edges.map(({ node }) => node.id),
        posts: edges,
        pageNumber: page,
        hasNextPage,
      },
    }),
  hasNextPage,
});

export default creator(GetGistpens, modify);
