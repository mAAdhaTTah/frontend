import React from 'react';
import { withSEO } from '../decorators';
import { Page } from '../components';

const SinglePage = ({ pageContext }) => {
  return <Page {...pageContext.page} />;
};

export default SinglePage
  |> withSEO(({ pageContext }) => ({
    title: pageContext.page.title,
  }));
