import {
  PostTemplateFragment,
  GatsbyImageSharpFluid,
  MediaImageFragment,
} from '../fragments';
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
  ${MediaImageFragment}
`;

const GetGallery = `
  query GetGallery($post: Int) {
    images: allWordpressWpMedia(filter: {post: {eq: $post}}) {
      edges {
        node {
          ...MediaImage
        }
      }
    }
  }

  ${MediaImageFragment}
  ${GatsbyImageSharpFluid}
`;

const modify = async (
  {
    results: {
      data: {
        allWordpressPost: {
          edges,
          pageInfo: { hasNextPage },
        },
      },
    },
    page,
  },
  { graphql, reporter }
) => {
  const posts = await Promise.all(
    edges.map(async ({ node }) => {
      if (node != null && node.format === 'gallery') {
        try {
          const response = await graphql(GetGallery, { post: node.id });

          if (response.errors) {
            console.error(
              `Error fetching gallery for ${node.slug}: ${response.errors
                .map(
                  ({ message, locations, path }) =>
                    `${message} Locations: ${JSON.stringify(
                      locations
                    )} Path: ${JSON.stringify(path)}`
                )
                .join(', ')}`,
              response
            );
          }

          node.images =
            (response.data &&
              response.data.images.edges
                .map(({ node }) => node)
                .filter(Boolean)) ||
            [];
        } catch (e) {
          console.error('Error updating node.', e);
        }
      }

      return {
        path: `/${node.slug}/`,
        component: PostSingleTemplate,
        context: {
          post: node,
        },
      };
    })
  );

  return {
    add: [
      ...posts,
      {
        path: page === 1 ? '/writing/' : '/writing/page/' + page,
        component: PostArchiveTemplate,
        context: {
          ids: edges.map(({ node }) => node.id),
          posts: edges,
          pageNumber: page,
          hasNextPage,
        },
      },
    ],
    hasNextPage,
  };
};

export default creator(GetPosts, modify);
