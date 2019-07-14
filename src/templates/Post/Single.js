import React from 'react';
import { Layout, Post } from '../../components';

const PostSingle = ({ pageContext }) => {
  return (
    <Layout>
      <Post.Article {...pageContext.post} />
    </Layout>
  );
};

export default PostSingle;
