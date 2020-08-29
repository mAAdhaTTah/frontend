import React from 'react';
import cc from 'classcat';
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
      <header className="relative mb-5">
        {media && <MediaImage media={media} />}
        <div
          className={cc([
            { absolute: media, 'pin-x-center': media, 'pin-y-bottom': media },
            'w-full',
            'bg-etched',
            'rounded',
            'p-5',
          ])}
        >
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
