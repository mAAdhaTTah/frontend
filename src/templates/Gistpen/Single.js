import React from 'react';
import { Layout, Post } from '../../components';

const PostSingle = ({ pageContext }) => {
  return (
    <>
      <Post.Article {...pageContext.post} />
    </>
  );
};

export default PostSingle;
