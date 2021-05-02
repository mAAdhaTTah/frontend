import cc from 'classcat';
import Article from '../../Article';
import EntryMeta from '../../EntryMeta';
import MediaImage from '../../MediaImage';
import { ArticleHeader } from '../../typography';
import { useParseHTML } from '../../../hooks';

const imageWrapperClass = cc(['flex', 'row', 'flex-wrap']);
const imageClass = cc(['w-1/3']);

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
            <MediaImage key={i} media={image} className={imageClass} />
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
