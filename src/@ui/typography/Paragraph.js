import cc from 'classcat';

const paragraphClass = cc(['font-ovo', 'text-xl', 'leading-normal', 'pb-3']);

/**
 * @typedef {{
 *  className?: string;
 *  children: import('react').ReactNode;
 * }} Props
 */

/** @type {import('react').FC<Props>} */
export const Paragraph = ({ className, children }) => {
  return <p className={cc([paragraphClass, className])}>{children}</p>;
};
