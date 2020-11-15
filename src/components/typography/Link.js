import React from 'react';
import cc from 'classcat';

const linkClass = cc(['no-underline']);

const Link = ({ children, href, className }) => {
  return (
    <a href={href} className={cc([linkClass, className])}>
      {children}
    </a>
  );
};

export default Link;
