import cc from 'classcat';
import { FaLongArrowAltRight } from 'react-icons/fa';
import Link from 'next/link';
import { Body } from '@ui/typography';
import { Article } from '@ui/box';
import { useParseHTML, useStripHTML } from '../../../hooks';
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
      <LinkedArticleHeader href={`/${slug}/`}>
        {useParseHTML(title)}
      </LinkedArticleHeader>
      <EntryMeta
        date={date}
        dateTime={dateTime}
        commentCount={commentCount}
        author={author.name}
      />
    </header>
    <Body>
      {useStripHTML(excerpt)}
      <Link href={`/${slug}/`}>
        <a className={linkClass}>
          Read more <FaLongArrowAltRight className={iconClass} />
        </a>
      </Link>
    </Body>
  </Article>
);

export default StandardFormat;
