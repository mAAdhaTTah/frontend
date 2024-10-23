import { Article } from '@ui/box';
import { FC } from 'react';
import EntryMeta from '../../../EntryMeta';
import { LinkedArticleHeader } from '../../../LinkedArticleHeader';
import { Embed } from '../../../Embed';

const OEmbed: FC<{}> = ({
  title,
  date,
  dateTime,
  commentCount,
  author,
  oembed,
  content,
}) => {
  const { html, url } = oembed;
  return (
    <Article variant="tertiary">
      <header>
        <LinkedArticleHeader href={url}>{title}</LinkedArticleHeader>
        <EntryMeta
          date={date}
          dateTime={dateTime}
          commentCount={commentCount}
          author={author.name}
        />
      </header>
      {html ? (
        <div className="mb-5">
          <Embed html={html} url={url} />
        </div>
      ) : null}
      {content}
    </Article>
  );
};

export default OEmbed;
