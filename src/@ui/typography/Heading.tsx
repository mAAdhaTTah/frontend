import cc from 'classcat';
import PropTypes from 'prop-types';

const variants = {
  article: cc(['text-4xl', 'text-lightg', 'font-muli', 'mb-5']),
  'h-1': cc(['text-4xl', 'text-lightg', 'font-muli', 'mb-5']),
  'h-2': cc(['mb-5', 'font-muli', 'text-3xl']),
  'h-3': cc(['mb-5', 'font-muli', 'text-2xl']),
  'h-4': cc(['mb-3', 'font-muli', 'inline-block', 'border-b-2', 'text-xl']),
};

export const Heading = ({ level, variant, children }: any) => {
  const Component = `h${level}`;
  // @ts-expect-error TS(2322) FIXME: Type '{ children: any; className: any; }' is not a... Remove this comment to see the full error message
  return <Component className={variants[variant]}>{children}</Component>;
};

Heading.propTypes = {
  level: PropTypes.oneOf([1, 2, 3, 4, 5, 6]).isRequired,
  variant: PropTypes.oneOf(Object.keys(variants)).isRequired,
  children: PropTypes.node,
};
