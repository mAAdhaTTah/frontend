import cc from 'classcat';

const h3Class = cc(['mb-5', 'font-muli']);

const H3 = ({ className, children }) => (
  <h3 className={cc([h3Class, className])}>{children}</h3>
);

export default H3;
