import React from 'react';
import { withSEO } from '../../decorators';
import { Gistpen } from '../../components';

const GistpenSingle = ({ pageContext: { post } }) => {
  return <Gistpen {...post} />;
};

export default GistpenSingle
  |> withSEO(({ pageContext }) => ({
    title: pageContext.post.description,
  }));
