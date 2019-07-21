import React from 'react';
import { useParseHTML } from '../../../hooks';
import { ArticleHeader } from '../../typography';
import EntryMeta from '../../EntryMeta';
import Article from '../../Article';

const StandardFormat = ({
  slug,
  title,
  date,
  dateTime,
  commentCount,
  author,
  content,
}) => (
  <Article>
    <header>
      {/* @TODO(mAAdhaTTah) building the slug here is bad */}
      <ArticleHeader>{useParseHTML(title)}</ArticleHeader>
      <EntryMeta
        date={date}
        dateTime={dateTime}
        commentCount={commentCount}
        author={author.name}
      />
    </header>

    {useParseHTML(content)}
  </Article>
);

export default StandardFormat;
