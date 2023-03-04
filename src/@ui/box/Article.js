import cc from 'classcat';
import PropTypes from 'prop-types';

const articleClass = cc([
  'mx-10',
  'mb-5',
  'p-5',
  'flow-root',
  'rounded',
  'max-w-xl',
  'mx-auto',
]);

export const Article = ({ variant = 'primary', children }) => {
  return (
    <article className={cc([articleClass, `bg-${variant}`])}>
      {children}
    </article>
  );
};

Article.propTypes = {
  variant: PropTypes.oneOf([
    'primary',
    'secondary',
    'tertiary',
    'lightg',
    'darkg',
  ]),
};
