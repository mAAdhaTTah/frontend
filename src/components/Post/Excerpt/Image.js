import React from 'react';
import Img from 'gatsby-image';
import Article from '../../Article';
import EntryMeta from '../../EntryMeta';
import { ArticleHeader } from '../../typography';
import { useParseHTML } from '../../../hooks';

const Image = ({
  title,
  date,
  dateTime,
  commentCount,
  author,
  content,
  meta,
  media,
}) => {
  return (
    <Article variant="darkg">
      <header>
        <ArticleHeader>{useParseHTML(title)}</ArticleHeader>
        <EntryMeta
          date={date}
          dateTime={dateTime}
          commentCount={commentCount}
          author={author.name}
        />
      </header>
      <Img fluid={media.src.image.fluid} alt={media.alt} />

      {useParseHTML(content)}
    </Article>
  );
};

export default Image;
