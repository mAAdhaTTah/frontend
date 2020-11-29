import React from 'react';
import { withSEO } from '../../decorators';
import { Post } from '../../components'; // eslint-disable-line

const PostSingle = ({ pageContext }) => {
  return <Post.Article {...pageContext.post} />;
};

export default PostSingle
  |> withSEO(({ pageContext }) => ({
    title: pageContext.post.title,
    metas: pageContext.post.metas ?? [],
    schemas: pageContext.post.schemas ?? [],
  }));
