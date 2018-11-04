import React from 'react';
import { Link } from 'gatsby';
import Logo from './Logo';

const headerClass =
  ' text-sm no-underline text-accent-dark hover:text-accent-light';

const HeaderLink = ({ to, children, className }) =>
  to.includes('http') ? (
    <a href={to} className={className + headerClass}>
      {children}
    </a>
  ) : (
    <Link to={to} className={className + headerClass}>
      {children}
    </Link>
  );

const Header = ({ siteTitle }) => (
  <header className="py-2 bg-secondary-color">
    <div className="container mx-auto flex flex-row items-center justify-between">
      <Logo title={siteTitle} />
      <div>
        <HeaderLink to="/" className="px-2">
          Home
        </HeaderLink>
        <HeaderLink to="http://jamesdigioia.com/" className="pl-2">
          Blog
        </HeaderLink>
      </div>
    </div>
  </header>
);

export default Header;
