import React from 'react';
import { useParseHTML } from '../hooks';
import { ArticleHeader } from './typography';
import Article from './Article';

const Page = ({ title, author, content, media }) => {
  return (
    <Article>
      <header className="mb-5">
        <ArticleHeader>{useParseHTML(title)}</ArticleHeader>
      </header>
      {media && <img src={media.url} alt={media.alt} />}
      {useParseHTML(content)}
    </Article>
  );
};

export default Page;
