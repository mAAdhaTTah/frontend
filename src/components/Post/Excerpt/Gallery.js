import cc from 'classcat';
import { Heading } from '@ui/typography';
import Article from '../../Article';
import EntryMeta from '../../EntryMeta';
import MediaImage from '../../MediaImage';
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
        <Heading level={1} variant="article">
          {useParseHTML(title)}
        </Heading>
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
