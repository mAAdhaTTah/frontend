import React from 'react';
import { Layout, Category } from '../components';

const SingleCategory = ({ pageContext }) => {
  return (
    <Layout>
      <Category {...pageContext.category} />
    </Layout>
  );
};

export default SingleCategory;
