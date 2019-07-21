import React from 'react';
import { Link as GatsbyLink } from 'gatsby';
import cc from 'classcat';

const linkClass = cc(['no-underline']);

const Link = ({ children, href, className }) => {
  if (href.match(/^[a-zA-Z]+:\/\//)) {
    return (
      <a href={href} className={cc([linkClass, className])}>
        {children}
      </a>
    );
  }

  return (
    <GatsbyLink to={href} className={cc([linkClass, className])}>
      {children}
    </GatsbyLink>
  );
};

export default Link;
