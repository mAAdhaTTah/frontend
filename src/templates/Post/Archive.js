import React from 'react';
import { Link } from 'gatsby';
import cc from 'classcat';
import { FaLongArrowAltRight, FaLongArrowAltLeft } from 'react-icons/fa';
import { Layout, Post } from '../../components';

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

const PostArchive = ({ pageContext }) => {
  return (
    <>
      <div className="max-w-xl mx-auto">
        {pageContext.posts.map(({ node }) => (
          <Post.Excerpt key={node.id} {...node} />
        ))}
      </div>
      <div className={paginationClass}>
        {pageContext.pageNumber > 1 && (
          <Link
            to={`/writing/${
              pageContext.pageNumber !== 2
                ? `page/${pageContext.pageNumber - 1}`
                : ''
            }`}
            className={cc([pageClass, 'float-left'])}
          >
            <FaLongArrowAltLeft className="mr-3" /> Previous
          </Link>
        )}
        {pageContext.hasNextPage && (
          <Link
            to={`/writing/page/${pageContext.pageNumber + 1}/`}
            className={cc([pageClass, 'float-right'])}
          >
            Next <FaLongArrowAltRight className="ml-3" />
          </Link>
        )}
      </div>
    </>
  );
};

export default PostArchive;
