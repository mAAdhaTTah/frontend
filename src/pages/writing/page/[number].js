import { withSEO } from '../../../decorators';
import { Pagination, Main, Post } from '../../../components';
import {
  getLayoutProps,
  getPostArchivePaths,
  getPosts,
  getSeoByPageId,
} from '../../../api';
import { server } from '../../../config';

const PostArchive = ({ posts, page, hasNextPage }) => {
  return (
    <Main>
      <div className="max-w-xl mx-auto">
        {posts.map(node => (
          <Post.Excerpt key={node.id} {...node} />
        ))}
      </div>
      <Pagination pageNumber={page} hasNextPage={hasNextPage} slug="writing" />
    </Main>
  );
};

export const getStaticPaths = async () => {
  return {
    paths: await getPostArchivePaths(),
    fallback: 'blocking',
  };
};

export const getStaticProps = async ({ params }) => {
  const { posts, page, hasNextPage } = await getPosts({
    page: params.number,
  });

  if (posts.length === 0) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      layout: await getLayoutProps(),
      seo: await getSeoByPageId(5339),
      posts,
      page,
      hasNextPage,
    },
    revalidate: server.DEFAULT_REVALIDATE_TIME,
  };
};

export default withSEO()(PostArchive);
