import cc from 'classcat';
import { FaLongArrowAltRight, FaLongArrowAltLeft } from 'react-icons/fa';
import Link from 'next/link';

const paginationClass = cc([
  'max-w-xl',
  'mx-auto',
  'flex',
  'flex-row',
  'justify-between',
]);

const pageClass = cc([
  'bg-darkg',
  'p-5',
  'rounded',
  'text-primary',
  'font-ovo',
  'no-underline',
  'flex',
  'items-center',
]);

const Pagination = ({ pageNumber, hasNextPage, slug }) => (
  <div className={paginationClass}>
    <div>
      {pageNumber > 1 && (
        <Link
          href={`/${slug}/${pageNumber !== 2 ? `page/${pageNumber - 1}` : ''}`}
          className={pageClass}
        >
          <FaLongArrowAltLeft className="mr-3" />
          Previous
        </Link>
      )}
    </div>
    <div>
      {hasNextPage && (
        <Link href={`/${slug}/page/${pageNumber + 1}/`} className={pageClass}>
          Next
          <FaLongArrowAltRight className="ml-3" />
        </Link>
      )}
    </div>
  </div>
);

export default Pagination;
