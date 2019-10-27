import React from 'react';
import { Tag } from '../components';

const SingleTag = ({ pageContext }) => {
  return (
    <>
      <Tag {...pageContext.tag} />
    </>
  );
};

export default SingleTag;
