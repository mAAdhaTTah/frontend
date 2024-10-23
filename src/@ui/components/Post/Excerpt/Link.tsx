import cc from 'classcat';
import { FaLink } from 'react-icons/fa';
import { Link } from '@ui/typography';
import { Article } from '@ui/box';
import EntryMeta from '../../EntryMeta';

const iconClass = cc(['mr-3', 'link-info']);

const LinkFormat = ({
  title,
  date,
  dateTime,
  commentCount,
  author,
  content,
  linkUrl,
}: any) => {
  return (
    <Article variant="lightg">
      <div>{content}</div>
      <div className="link-meta">
        <Link href={linkUrl}>
          <FaLink className={iconClass} /> {title}
        </Link>
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

export default LinkFormat;
