import { useParseHTML } from '../hooks';
import { ArticleHeader, Article } from '../components';

export const Page = ({ title, content }) => {
  return (
    <Article>
      <header className="mb-5">
        <ArticleHeader>{useParseHTML(title)}</ArticleHeader>
      </header>
      {useParseHTML(content)}
    </Article>
  );
};
