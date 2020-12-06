import React from 'react';
import cc from 'classcat';
import { FaLongArrowAltRight, FaLongArrowAltLeft } from 'react-icons/fa';
import Link from 'next/link';

const paginationClass = cc([
  'clearfix',
  'max-w-xl',
  'mx-auto',
  'items-stretch',
]);

const pageClass = cc([
  'bg-darkg',
  'p-5',
  'rounded',
  'text-primary',
  'font-body',
  'no-underline',
  'flex',
  'align-center',
]);

const Pagination = ({ pageNumber, hasNextPage, slug }) => (
  <div className={paginationClass}>
    {pageNumber > 1 && (
      <Link
        href={`/${slug}/${pageNumber !== 2 ? `page/${pageNumber - 1}` : ''}`}
      >
        <a className={cc([pageClass, 'float-left'])}>
          <FaLongArrowAltLeft className="mr-3" /> Previous
        </a>
      </Link>
    )}
    {hasNextPage && (
      <Link href={`/${slug}/page/${pageNumber + 1}/`}>
        <a className={cc([pageClass, 'float-right'])}>
          Next <FaLongArrowAltRight className="ml-3" />
        </a>
      </Link>
    )}
  </div>
);

export default Pagination;
