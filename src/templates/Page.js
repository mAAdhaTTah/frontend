import React from 'react';
import { Layout, Page } from '../components';

const SinglePage = ({ pageContext }) => {
  return (
    <Layout>
      <Page {...pageContext.page} />
    </Layout>
  );
};

export default SinglePage;
