import cc from 'classcat';

const paragraphClass = cc(['font-ovo', 'text-xl', 'leading-normal', 'pb-3']);

export const Paragraph = ({ children }) => {
  return <p className={paragraphClass}>{children}</p>;
};
