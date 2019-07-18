import React from 'react';
import EmbedContainer from 'react-oembed-container';
import Article from '../../Article';
import EntryMeta from '../../EntryMeta';
import { LinkedArticleHeader } from '../../typography';
import { useParseHTML } from '../../../hooks';

const OEmbed = ({
  title,
  slug,
  date,
  dateTime,
  comment_count,
  author,
  fields,
  content,
}) => {
  const embed = useParseHTML(
    fields.oembed.audio?.html ?? fields.oembed.video?.html
  );
  const parsedContent = useParseHTML(content);

  return (
    <Article variant="tertiary">
      <header>
        {/* @TODO(mAAdhaTTah) building the slug here is bad */}
        <LinkedArticleHeader href={`/${slug}/`}>{title}</LinkedArticleHeader>
      </header>
      {fields.oembed.audio?.html ? (
        <EmbedContainer markup={fields.oembed.audio.html}>
          {embed}
        </EmbedContainer>
      ) : null /* TODO(mAAdhaTTah) render error */}
      <EntryMeta
        date={date}
        dateTime={dateTime}
        comment_count={comment_count}
        author={author.name}
      />
      {parsedContent}
    </Article>
  );
};

export default OEmbed;
