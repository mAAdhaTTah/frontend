import { Main } from '@ui/box';
import { Post } from '@ui/components';

export const Single = ({ post }) => {
  return (
    <Main>
      <Post.Article {...post} />
    </Main>
  );
};
