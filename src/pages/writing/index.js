import React from 'react';
import { withSEO } from '../../decorators';
import { Pagination, Main, Post } from '../../components';
import { getPosts, getLayoutProps, getSeoByPageId } from '../../api';
import { DEFAULT_REVALIDATE_TIME } from '../../constants';

const GistpenArchive = ({ posts, page, hasNextPage }) => {
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

export const getStaticProps = async () => {
  const { posts, page, hasNextPage } = await getPosts({
    page: 1,
  });
  return {
    props: {
      layout: await getLayoutProps(),
      seo: await getSeoByPageId(5339),
      posts,
      page,
      hasNextPage,
    },
    revalidate: DEFAULT_REVALIDATE_TIME,
  };
};

export default withSEO()(GistpenArchive);
