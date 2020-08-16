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
  commentCount,
  author,
  fields,
  content,
  meta,
}) => {
  const { html } = fields.oembed.audio ?? fields.oembed.video;
  const embed = useParseHTML(html);

  return (
    <Article variant="tertiary">
      <header>
        <LinkedArticleHeader href={meta.audioEmbed || meta.videoEmbed}>
          {useParseHTML(title)}
        </LinkedArticleHeader>
        <EntryMeta
          date={date}
          dateTime={dateTime}
          commentCount={commentCount}
          author={author.name}
        />
      </header>
      {html ? (
        <div className="mb-5">
          <EmbedContainer markup={html}>{embed}</EmbedContainer>
        </div>
      ) : null /* TODO(mAAdhaTTah) render error */}
      {useParseHTML(content)}
    </Article>
  );
};

export default OEmbed;
