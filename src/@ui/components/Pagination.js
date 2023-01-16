import cc from 'classcat';
import { FaLongArrowAltRight, FaLongArrowAltLeft } from 'react-icons/fa';
import Link from 'next/link';

const paginationClass = cc([
  'flow-root',
  'max-w-xl',
  'mx-auto',
  'items-stretch',
  'px-4',
]);

const pageClass = cc([
  'bg-darkg',
  'p-5',
  'rounded',
  'text-primary',
  'font-ovo',
  'no-underline',
  'flex',
  'align-center',
]);

const Pagination = ({ pageNumber, hasNextPage, slug }) => (
  <div className={paginationClass}>
    {pageNumber > 1 && (
      <Link
        href={`/${slug}/${pageNumber !== 2 ? `page/${pageNumber - 1}` : ''}`}
        className={cc([pageClass, 'float-left'])}
      >
        <FaLongArrowAltLeft className="mr-3" />
        Previous
      </Link>
    )}
    {hasNextPage && (
      <Link
        href={`/${slug}/page/${pageNumber + 1}/`}
        className={cc([pageClass, 'float-right'])}
      >
        Next
        <FaLongArrowAltRight className="ml-3" />
      </Link>
    )}
  </div>
);

export default Pagination;
