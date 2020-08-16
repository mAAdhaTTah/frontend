import React from 'react';
import { withSEO } from '../decorators';
import { Category } from '../components';

const SingleCategory = ({ pageContext }) => {
  return <Category {...pageContext.category} />;
};

export default SingleCategory
  |> withSEO(({ pageContext }) => ({
    title: pageContext.category.name,
    // @TODO(mAAdhaTTah) correctly fetch data
    metas: pageContext.category.metas ?? [],
    schemas: pageContext.category.schemas ?? [],
  }));
