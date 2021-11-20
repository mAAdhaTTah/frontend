import { getGistpens, getLayoutProps, getSeoByPageId } from '@wp/api';
import { withSEO } from '../../decorators';
import { Pagination, Gistpen, Main } from '../../components';

const GistpenArchive = ({ posts, page, hasNextPage }) => {
  return (
    <Main>
      {posts.map(node => (
        <Gistpen key={node.id} {...node} linkHeader />
      ))}
      <Pagination pageNumber={page} hasNextPage={hasNextPage} slug="gistpens" />
    </Main>
  );
};

export const getStaticProps = async () => {
  const { posts, page, hasNextPage } = await getGistpens({
    page: 1,
  });
  return {
    props: {
      layout: await getLayoutProps(),
      seo: await getSeoByPageId(6105),
      posts,
      page,
      hasNextPage,
    },
  };
};

export default withSEO()(GistpenArchive);
