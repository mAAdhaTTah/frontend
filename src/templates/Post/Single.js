import React from 'react';
import { Post } from '../../components';

const PostSingle = ({ pageContext }) => {
  return (
    <>
      <Post.Article {...pageContext.post} />
    </>
  );
};

export default PostSingle;
