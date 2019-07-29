import React from 'react';
import { Layout, Page } from '../components';

const SinglePage = ({ pageContext }) => {
  return (
    <>
      <Page {...pageContext.page} />
    </>
  );
};

export default SinglePage;
