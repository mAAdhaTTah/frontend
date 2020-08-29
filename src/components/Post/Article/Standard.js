import React from 'react';
import { useParseHTML } from '../../../hooks';
import { ArticleHeader } from '../../typography';
import EntryMeta from '../../EntryMeta';
import Article from '../../Article';
import MediaImage from '../../MediaImage';

const StandardFormat = ({
  media,
  title,
  date,
  dateTime,
  commentCount,
  author,
  content,
}) => {
  return (
    <Article>
      <header className="relative">
        {media && <MediaImage media={media} />}
        <div className="absolute pin-x-center pin-y-bottom w-full bg-etched rounded p-5">
          <ArticleHeader className="text-black text-center mb-5">
            {useParseHTML(title)}
          </ArticleHeader>
          <div className="flex justify-center">
            <EntryMeta
              date={date}
              dateTime={dateTime}
              commentCount={commentCount}
              author={author.name}
              className="flex-grow-0"
            />
          </div>
        </div>
      </header>

      {useParseHTML(content)}
    </Article>
  );
};

export default StandardFormat;
