import React from 'react';
import Img from 'gatsby-image';
import cc from 'classcat';
import Article from '../../Article';
import EntryMeta from '../../EntryMeta';
import { ArticleHeader } from '../../typography';
import { useParseHTML } from '../../../hooks';

const imageWrapperClass = cc(['flex', 'row']);
const imageClass = cc(['flex-1', 'w-1/3']);

const Gallery = ({
  title,
  date,
  dateTime,
  commentCount,
  author,
  content,
  meta,
  images,
}) => {
  return (
    <Article variant="tertiary">
      <header>
        <ArticleHeader>{useParseHTML(title)}</ArticleHeader>
        <div className={imageWrapperClass}>
          {images.map((image, i) => (
            <Img
              key={i}
              fluid={image.src.image.fluid}
              alt={image.alt}
              className={imageClass}
            />
          ))}
        </div>
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
};

export default Gallery;
