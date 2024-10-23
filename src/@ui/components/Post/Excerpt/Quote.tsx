import { Link } from '@ui/typography';
import { Blockquote } from '@ui/atoms';
import { Article } from '@ui/box';
import EntryMeta from '../../EntryMeta';

const Quote = ({
  content,
  date,
  dateTime,
  commentCount,
  author,
  source,
}: any) => {
  return (
    <Article variant="lightg">
      <div className="entry-content mb-3">
        <Blockquote>
          {content}
          <cite className="font-ovo">
            &mdash; <Link href={source.url}>{source.name}</Link>
          </cite>
        </Blockquote>
      </div>
      <EntryMeta
        date={date}
        dateTime={dateTime}
        commentCount={commentCount}
        author={author.name}
      />
    </Article>
  );
};

export default Quote;
