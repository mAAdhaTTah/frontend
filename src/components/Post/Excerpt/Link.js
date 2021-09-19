import cc from 'classcat';
import { FaLink } from 'react-icons/fa';
import { Link } from '@ui/typography';
import { useParseHTML } from '../../../hooks';
import Article from '../../Article';
import EntryMeta from '../../EntryMeta';

const linkClass = cc([
  'bg-darkg',
  'mb-3',
  'p-3',
  'flex',
  'text-primary',
  'font-muli',
  'rounded',
  'text-lg',
  'link-title',
]);

const iconClass = cc(['mr-3', 'link-info']);

const LinkFormat = ({
  title,
  date,
  dateTime,
  commentCount,
  author,
  content,
  meta,
  embedly,
}) => {
  return (
    <Article variant="lightg">
      <div className="">{useParseHTML(content)}</div>
      <div className="link-meta">
        <Link href={meta.linkUrl} className={linkClass}>
          <FaLink className={iconClass} /> {useParseHTML(title)}
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
