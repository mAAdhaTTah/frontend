import NextImage from 'next/image';
import { Heading } from '@ui/typography';
import { Article } from '@ui/box';
import EntryMeta from '../../EntryMeta';

const Image = ({
  title,
  date,
  dateTime,
  commentCount,
  author,
  content,
  media,
}: any) => {
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
