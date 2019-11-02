import React from 'react';
import { withSEO } from '../../decorators';
import { Post } from '../../components';

const PostSingle = ({ pageContext }) => {
  return <Post.Article {...pageContext.post} />;
};

export default PostSingle
  |> withSEO(({ pageContext }) => ({
    title: pageContext.post.title,
    metas: pageContext.post.metas ?? [],
    schema: pageContext.post.schema ?? '',
  }));
