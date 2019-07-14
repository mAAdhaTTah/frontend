import React from 'react';
import { Layout, Post } from '../../components';

const PostArchive = ({ pageContext }) => {
  return (
    <Layout>
      {pageContext.posts.map(({ node }) => (
        <Post.Excerpt key={node.id} {...node} />
      ))}
    </Layout>
  );
};

export default PostArchive;
