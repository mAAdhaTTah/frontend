import React from 'react';
import { Layout, Category } from '../components';

const SingleCategory = ({ pageContext }) => {
  return (
    <>
      <Category {...pageContext.category} />
    </>
  );
};

export default SingleCategory;
