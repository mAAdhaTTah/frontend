import NextImage from 'next/image';
import EntryMeta from '../../EntryMeta';
import { Heading } from '@ui/typography';
import { Article } from '@ui/box';

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
      {media && <NextImage {...media} />}

      {content}
    </Article>
  );
};

export default Image;
