import cc from 'classcat';
import Article from '../../Article';
import EntryMeta from '../../EntryMeta';
import { useParseHTML } from '../../../hooks';

const pClass = cc(['text-tertiary']);

const Status = ({ content, date, dateTime, commentCount, author }) => {
  return (
    <Article variant="darkg">
      <div className="entry-content">
        {useParseHTML(content, { p: pClass })}
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

export default Status;
