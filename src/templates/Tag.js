import React from 'react';
import { withSEO } from '../decorators';
import { Tag } from '../components';

const SingleTag = ({ pageContext }) => {
  return <Tag {...pageContext.tag} />;
};

export default SingleTag
  |> withSEO(({ pageContext }) => ({
    title: pageContext.tag.name,
    // @TODO(mAAdhaTTah) correctly fetch data
    metas: pageContext.tag.metas ?? [],
    schema: pageContext.tag.schema ?? '',
  }));
