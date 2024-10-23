import { Main } from '@ui/box';
import { Post } from '@ui/components';
import { FC } from 'react';

export const Single: FC<{ post: { format: string } }> = ({ post }) => {
  return (
    <Main>
      <Post.Article {...post} />
    </Main>
  );
};
