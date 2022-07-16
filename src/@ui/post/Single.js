import { Main } from '@ui/box';
import { Post } from '@ui/components';

export const Single = ({ post }) => {
  return (
    <Main>
      <div className="max-w-xl mx-auto">
        <Post.Article {...post} />
      </div>
    </Main>
  );
};
