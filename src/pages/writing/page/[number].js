import React from 'react';
import { withSEO } from '../../../decorators';
import { Pagination, Main, Post } from '../../../components';
import {
  getLayoutProps,
  getPostArchivePaths,
  getPosts,
  getSeoByPageId,
} from '../../../api';

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
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const { posts, page, hasNextPage } = await getPosts({
    page: params.number,
  });
  return {
    props: {
      layout: await getLayoutProps(),
      seo: await getSeoByPageId(5339),
      posts,
      page,
      hasNextPage,
    },
  };
};

export default withSEO()(PostArchive);
