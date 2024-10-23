import cc from 'classcat';
import { FC, ReactNode } from 'react';

const paragraphClass = cc(['font-ovo', 'text-xl', 'leading-normal', 'pb-3']);

export const Paragraph: FC<{ children: ReactNode }> = ({ children }) => {
  return <p className={paragraphClass}>{children}</p>;
};
