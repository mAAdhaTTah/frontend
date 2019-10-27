import React from 'react';
import { Pagination, Gistpen } from '../../components';

const GistpenSingle = ({ pageContext }) => {
  return (
    <>
      {pageContext.posts.map(({ node }) => (
        <Gistpen key={node.id} {...node} />
      ))}
      <Pagination
        pageNumber={pageContext.pageNumber}
        hasNextPage={pageContext.hasNextPage}
        slug="gistpens"
      />
    </>
  );
};

export default GistpenSingle;
