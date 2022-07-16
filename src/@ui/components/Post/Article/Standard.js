import cc from 'classcat';
import { Heading } from '@ui/typography';
import { Article } from '@ui/box';
import EntryMeta from '../../EntryMeta';
import MediaImage from '../../MediaImage';

const StandardFormat = ({
  media,
  title,
  date,
  dateTime,
  commentCount,
  author,
  content,
}) => {
  return (
    <Article>
      <header className="relative mb-5">
        {media && <MediaImage media={media} />}
        <div
          className={cc([
            { absolute: media, 'pin-x-center': media, 'pin-y-bottom': media },
            'w-full',
            'bg-etched',
            'rounded',
            'p-5',
          ])}
        >
          <div className="text-center">
            <Heading level={1} variant="article">
              {title}
            </Heading>
          </div>
          <div className="flex justify-center">
            <EntryMeta
              date={date}
              dateTime={dateTime}
              commentCount={commentCount}
              author={author.name}
              className="grow-0"
            />
          </div>
        </div>
      </header>
      {content}
    </Article>
  );
};

export default StandardFormat;
