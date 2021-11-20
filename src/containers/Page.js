import { Article } from '@ui/box';
import { Heading } from '@ui/typography';
import { useParseHTML } from '../hooks';

export const Page = ({ title, content }) => {
  return (
    <Article>
      <header className="mb-5">
        <Heading level={1} variant="article">
          {useParseHTML(title)}
        </Heading>
      </header>
      {useParseHTML(content)}
    </Article>
  );
};
