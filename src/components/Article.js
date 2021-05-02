import cc from 'classcat';
import PropTypes from 'prop-types';

const articleClass = cc([
  'p-5',
  'flow-root',
  'rounded',
  'pb-3',
  'mb-5',
  'max-w-xl',
  'mx-auto',
]);

const Article = ({ variant = 'primary', children }) => {
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

export default Article;
