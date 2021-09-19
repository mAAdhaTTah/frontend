import cc from 'classcat';
import NextLink from 'next/link';

const linkClass = cc(['no-underline', 'border-b-2', 'border-darkg']);

export const Link = ({ children, href }) => {
  return (
    <NextLink href={href}>
      <a className={linkClass}>{children}</a>
    </NextLink>
  );
};
