import cc from 'classcat';

const paragraphClass = cc(['font-ovo', 'text-xl', 'leading-normal', 'pb-3']);

/**
 * @typedef {{
 *  children: import('react').ReactNode;
 * }} Props
 */

/** @type {import('react').FC<Props>} */
export const Paragraph = ({ children }) => {
  return <p className={paragraphClass}>{children}</p>;
};
