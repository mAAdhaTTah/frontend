import React from 'react';
import { Layout, Tag } from '../components';

const SingleTag = ({ pageContext }) => {
  return (
    <>
      <Tag {...pageContext.tag} />
    </>
  );
};

export default SingleTag;
