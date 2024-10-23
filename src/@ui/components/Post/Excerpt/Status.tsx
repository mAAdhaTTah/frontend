import { Article } from '@ui/box';
import EntryMeta from '../../EntryMeta';

const Status = ({ content, date, dateTime, commentCount, author }: any) => {
  return (
    <Article variant="darkg">
      <div className="entry-content text-tertiary">{content}</div>
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
