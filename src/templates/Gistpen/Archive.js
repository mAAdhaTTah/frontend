import React from 'react';
import { withSEO } from '../../decorators';
import { Pagination, Gistpen } from '../../components';

const GistpenArchive = ({ pageContext }) => {
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

export default GistpenArchive
  |> withSEO(({ pageContext: { pageNumber } }) => ({
    title: `Code${pageNumber > 1 ? ` | Page ${pageNumber}` : ''}`,
  }));
