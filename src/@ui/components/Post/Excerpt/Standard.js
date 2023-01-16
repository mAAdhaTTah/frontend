import cc from 'classcat';
import { FaLongArrowAltRight } from 'react-icons/fa';
import Link from 'next/link';
import { Article } from '@ui/box';
import { LinkedArticleHeader } from '../../LinkedArticleHeader';
import EntryMeta from '../../EntryMeta';

const linkClass = cc([
  'font-ovo',
  'flex',
  'flex-row',
  'items-center',
  'float-right',
  'no-underline',
  'bg-darkg',
  'p-2',
  'text-primary',
  'rounded',
  'mt-3',
  'text-xl',
  'leading-normal',
]);
const iconClass = cc(['ml-2']);

const StandardFormat = ({
  slug,
  title,
  date,
  dateTime,
  commentCount,
  author,
  excerpt,
}) => (
  <Article>
    <header>
      <LinkedArticleHeader href={`/${slug}/`}>{title}</LinkedArticleHeader>
      <EntryMeta
        date={date}
        dateTime={dateTime}
        commentCount={commentCount}
        author={author.name}
      />
    </header>
    <div>
      {excerpt}
      <Link href={`/${slug}/`} className={linkClass}>
        Read more
        <FaLongArrowAltRight className={iconClass} />
      </Link>
    </div>
  </Article>
);

export default StandardFormat;
