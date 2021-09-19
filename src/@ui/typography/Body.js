import cc from 'classcat';

const bodyClass = cc(['font-ovo', 'text-xl', 'leading-normal', 'pb-3']);

export const Body = ({ children }) => {
  return <p className={bodyClass}>{children}</p>;
};
