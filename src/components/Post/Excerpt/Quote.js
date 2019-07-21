import React from 'react';
import Article from '../../Article';
import EntryMeta from '../../EntryMeta';
import { useParseHTML } from '../../../hooks';
import { Blockquote, Link } from '../../typography';

const Quote = ({
  content,
  date,
  dateTime,
  commentCount,
  author,
  meta
}) => {
  return (
    <Article variant="lightg">
      <div className="entry-content">
        <Blockquote>
          {useParseHTML(content)}
          <cite>
            <Link href={meta.quoteSourceUrl}>{meta.quoteSourceName}</Link>
          </cite>
        </Blockquote>
      </div>
      <EntryMeta
        date={date}
        dateTime={dateTime}
        commentCount={commentCount}
        author={author.name}
      />
    </Article>
  );
};

export default Quote;
