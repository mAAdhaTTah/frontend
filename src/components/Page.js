import React from 'react';
import { useParseHTML } from '../hooks';
import { ArticleHeader } from './typography';
import Article from './Article';
import EntryMeta from './EntryMeta';

const Page = ({ title, date, author, content }) => {
  return (
    <Article>
      <header>
        <ArticleHeader>{useParseHTML(title)}</ArticleHeader>
        <img src="#" alt="TODO featured image" />
        <EntryMeta />
      </header>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </Article>
  );
};

export default Page;
