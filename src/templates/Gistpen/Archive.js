import React from 'react';
import { Layout, Post } from '../../components';

const PostArchive = ({ pageContext }) => {
  return (
    <>
      {pageContext.posts.map(({ node }) => (
        <Post.Excerpt key={node.id} {...node} />
      ))}
    </>
  );
};

export default PostArchive;
