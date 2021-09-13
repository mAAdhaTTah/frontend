import cc from 'classcat';

const h4Class = cc(['mb-3', 'font-muli', 'inline-block', 'border-b-2']);

const H4 = ({ className, children }) => (
  <h4 className={cc([h4Class, className])}>{children}</h4>
);

export default H4;
