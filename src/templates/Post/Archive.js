import React from 'react';
import { Layout, Post } from '../../components';

const PostArchive = ({ pageContext }) => {
  return (
    <Layout>
      <div className="max-w-xl mx-auto">
        {pageContext.posts.map(({ node }) => (
          <Post.Excerpt key={node.id} {...node} />
        ))}
      </div>
    </Layout>
  );
};

export default PostArchive;
