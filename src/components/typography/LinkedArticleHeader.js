import React from 'react';
import ArticleHeader from './ArticleHeader';
import Link from './Link';

const LinkedArticleHeader = ({ href, children }) => {
  return (
    <ArticleHeader>
      <Link href={href}>{children}</Link>
    </ArticleHeader>
  );
};

export default LinkedArticleHeader;
