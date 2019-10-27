import React from 'react';
import { Link } from 'gatsby';
import cc from 'classcat';
import { FaLongArrowAltRight, FaLongArrowAltLeft } from 'react-icons/fa';

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
        to={`/${slug}/${pageNumber !== 2 ? `page/${pageNumber - 1}` : ''}`}
        className={cc([pageClass, 'float-left'])}
      >
        <FaLongArrowAltLeft className="mr-3" /> Previous
      </Link>
    )}
    {hasNextPage && (
      <Link
        to={`/${slug}/page/${pageNumber + 1}/`}
        className={cc([pageClass, 'float-right'])}
      >
        Next <FaLongArrowAltRight className="ml-3" />
      </Link>
    )}
  </div>
);

export default Pagination;
