import React from 'react';
import { withSEO } from '../../decorators';
import { Pagination, Gistpen, Main } from '../../components';

const GistpenArchive = ({ pageContext }) => {
  return (
    <Main>
      {pageContext.posts.map(({ node }) => (
        <Gistpen key={node.id} {...node} />
      ))}
      <Pagination
        pageNumber={pageContext.pageNumber}
        hasNextPage={pageContext.hasNextPage}
        slug="gistpens"
      />
    </Main>
  );
};

export default GistpenArchive
  |> withSEO(({ pageContext: { pageNumber } }) => ({
    title: `Code${pageNumber > 1 ? ` | Page ${pageNumber}` : ''}`,
    // @TODO(mAAdhaTTah) correctly fetch data
    metas: [],
    schemas: [],
  }));
