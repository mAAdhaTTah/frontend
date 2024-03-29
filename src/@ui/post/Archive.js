import { Main } from '@ui/box';
import { Pagination, Post } from '@ui/components';

export const Archive = ({ excerpts, pageNumber, hasNextPage }) => {
  // TODO remove extra div
  return (
    <Main>
      {excerpts.map(excerpt => (
        <Post.Excerpt key={excerpt.id} {...excerpt} />
      ))}
      <Pagination
        pageNumber={pageNumber}
        hasNextPage={hasNextPage}
        slug="writing"
      />
    </Main>
  );
};
