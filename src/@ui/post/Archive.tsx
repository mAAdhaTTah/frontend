import { Main } from '@ui/box';
import { Pagination, Post } from '@ui/components';
import { FC } from 'react';

type Excerpt = {
  id: string;
};

export const Archive: FC<{
  excerpts: Excerpt[];
  pageNumber: number;
  hasNextPage: boolean;
}> = ({ excerpts, pageNumber, hasNextPage }) => {
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
