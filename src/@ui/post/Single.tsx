import { Main } from '@ui/box';
import { Post } from '@ui/components';

export const Single = ({ post }: any) => {
  return (
    <Main>
      <Post.Article {...post} />
    </Main>
  );
};
