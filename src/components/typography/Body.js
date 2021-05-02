import cc from 'classcat';

const bodyClass = cc(['font-ovo', 'text-xl', 'leading-normal', 'pb-3']);

const Body = ({ component: C = 'p', className, children }) => (
  <C className={cc([bodyClass, className])}>{children}</C>
);

export default Body;
