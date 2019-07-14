import React from 'react';
import { Layout, Tag } from '../components';

const SingleTag = ({ pageContext }) => {
  return (
    <Layout>
      <Tag {...pageContext.tag} />
    </Layout>
  );
};

export default SingleTag;
