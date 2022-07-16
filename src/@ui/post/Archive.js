import { Main } from '@ui/box';
import { Pagination, Post } from '@ui/components';

export const Archive = ({ excerpts, pageNumber, hasNextPage }) => {
  // TODO remove extra div
  return (
    <Main>
      <div className="mx-4 pt-5">
        <div className="max-w-xl mx-auto">
          {excerpts.map(excerpt => (
            <Post.Excerpt key={excerpt.id} {...excerpt} />
          ))}
        </div>
      </div>
      <Pagination
        pageNumber={pageNumber}
        hasNextPage={hasNextPage}
        slug="writing"
      />
    </Main>
  );
};
