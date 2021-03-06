import cc from 'classcat';

const h3ClassName = cc(['text-4xl', 'text-lightg', 'font-muli', 'mb-2']);

const ArticleHeader = ({ children, className = '' }) => (
  <h3 className={cc([h3ClassName, className])}>{children}</h3>
);

export default ArticleHeader;
