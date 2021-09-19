import { Heading } from '@ui/typography';
import MediaImage from '../../MediaImage';
import Article from '../../Article';
import EntryMeta from '../../EntryMeta';
import { useParseHTML } from '../../../hooks';

const Image = ({
  title,
  date,
  dateTime,
  commentCount,
  author,
  content,
  media,
}) => {
  return (
    <Article variant="darkg">
      <header>
        <Heading level={1} variant="article">
          {useParseHTML(title)}
        </Heading>
        <EntryMeta
          date={date}
          dateTime={dateTime}
          commentCount={commentCount}
          author={author.name}
        />
      </header>
      {media && <MediaImage media={media} />}

      {useParseHTML(content)}
    </Article>
  );
};

export default Image;
