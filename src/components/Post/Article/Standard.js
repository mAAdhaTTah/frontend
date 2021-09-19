import cc from 'classcat';
import { Heading } from '@ui/typography';
import { useParseHTML } from '../../../hooks';
import EntryMeta from '../../EntryMeta';
import Article from '../../Article';
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
              {useParseHTML(title)}
            </Heading>
          </div>
          <div className="flex justify-center">
            <EntryMeta
              date={date}
              dateTime={dateTime}
              commentCount={commentCount}
              author={author.name}
              className="flex-grow-0"
            />
          </div>
        </div>
      </header>

      <section className="max-w-prose">{useParseHTML(content)}</section>
    </Article>
  );
};

export default StandardFormat;
