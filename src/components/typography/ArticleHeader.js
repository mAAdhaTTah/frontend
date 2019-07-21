import React from 'react';
import cc from 'classcat';

const h3ClassName = cc(['text-4xl', 'text-lightg', 'font-header', 'mb-2']);

const ArticleHeader = ({ children }) => (
  <h3 className={h3ClassName}>{children}</h3>
);

export default ArticleHeader;
