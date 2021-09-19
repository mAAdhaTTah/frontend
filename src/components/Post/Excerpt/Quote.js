import { Blockquote, Link } from '@ui/typography';
import Article from '../../Article';
import EntryMeta from '../../EntryMeta';
import { useParseHTML } from '../../../hooks';

const Quote = ({ content, date, dateTime, commentCount, author, meta }) => {
  return (
    <Article variant="lightg">
      <div className="entry-content mb-3">
        <Blockquote>
          {useParseHTML(content)}
          <cite className="font-ovo">
            &mdash;{' '}
            <Link href={meta.quoteSourceUrl}>{meta.quoteSourceName}</Link>
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
