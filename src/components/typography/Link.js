import React from 'react';
import cc from 'classcat';
import NextLink from 'next/link';

const linkClass = cc(['no-underline']);

const Link = ({ children, href, className }) => {
  return (
    <NextLink href={href}>
      <a className={cc([linkClass, className])}>{children}</a>
    </NextLink>
  );
};

export default Link;
