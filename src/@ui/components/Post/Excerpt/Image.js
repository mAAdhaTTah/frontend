import { Heading } from '@ui/typography';
import { Article } from '@ui/box';
import MediaImage from '../../MediaImage';
import EntryMeta from '../../EntryMeta';

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
          {title}
        </Heading>
        <EntryMeta
          date={date}
          dateTime={dateTime}
          commentCount={commentCount}
          author={author.name}
        />
      </header>
      {media && <MediaImage media={media} />}

      {content}
    </Article>
  );
};

export default Image;
