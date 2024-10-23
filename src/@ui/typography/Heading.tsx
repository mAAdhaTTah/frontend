import cc from 'classcat';
import { FC, ReactNode } from 'react';

const variants = {
  article: cc(['text-4xl', 'text-lightg', 'font-muli', 'mb-5']),
  'h-1': cc(['text-4xl', 'text-lightg', 'font-muli', 'mb-5']),
  'h-2': cc(['mb-5', 'font-muli', 'text-3xl']),
  'h-3': cc(['mb-5', 'font-muli', 'text-2xl']),
  'h-4': cc(['mb-3', 'font-muli', 'inline-block', 'border-b-2', 'text-xl']),
} as const;

export const Heading: FC<{
  level: 1 | 2 | 3 | 4 | 5 | 6;
  variant: keyof typeof variants;
  children: ReactNode;
}> = ({ level, variant, children }) => {
  const Component = `h${level}`;
  // @ts-expect-error TS(2322) FIXME: Type '{ children: any; className: any; }' is not a... Remove this comment to see the full error message
  return <Component className={variants[variant]}>{children}</Component>;
};
