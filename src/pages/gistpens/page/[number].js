import { withSEO } from '../../../decorators';
import { Pagination, Gistpen, Main } from '../../../components';
import {
  getGistpens,
  getGistpenArchivePaths,
  getLayoutProps,
  getSeoByPageId,
} from '../../../api';
import { DEFAULT_REVALIDATE_TIME } from '../../../constants';

const GistpenArchive = ({ posts, page, hasNextPage }) => {
  return (
    <Main>
      {posts.map(node => (
        <Gistpen key={node.id} {...node} />
      ))}
      <Pagination pageNumber={page} hasNextPage={hasNextPage} slug="gistpens" />
    </Main>
  );
};

export const getStaticPaths = async () => {
  return {
    paths: await getGistpenArchivePaths(),
    fallback: 'blocking',
  };
};

export const getStaticProps = async ({ params }) => {
  const { posts, page, hasNextPage } = await getGistpens({
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
      seo: await getSeoByPageId(6105),
      posts,
      page,
      hasNextPage,
    },
    revalidate: DEFAULT_REVALIDATE_TIME,
  };
};

export default withSEO()(GistpenArchive);
