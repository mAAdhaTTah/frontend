import React from 'react';
import { Link } from 'gatsby';
import cc from 'classcat';
import PropTypes from 'prop-types';

const headerClass = cc([
  'no-underline',
  'text-accent-dark',
  'hover:bg-accent-light',
  'text-lg',
  'p-5',
  'font-body',
  'leading-tight',
]);

const HeaderLink = ({ to, children }) =>
  to.includes('http') ? (
    <a href={to} className={headerClass}>
      {children}
    </a>
  ) : (
    <Link to={to} className={headerClass}>
      {children}
    </Link>
  );

const navClass = cc(['bg-secondary-color', 'h-16']);

const Nav = () => (
  <nav className={navClass}>
    <div className="container mx-auto flex flex-row justify-end">
      {/* @TODO(mAAdhaTTah) get menus from BE */}
      <HeaderLink to="/">Home</HeaderLink>
      <HeaderLink to="/writing/">Writing</HeaderLink>
      <HeaderLink to="/reads/">Reading</HeaderLink>
      <HeaderLink to="/gistpens/">Code</HeaderLink>
      <HeaderLink to="/resume/">Resume</HeaderLink>
      <HeaderLink to="/projects/">Projects</HeaderLink>
      <HeaderLink to="/about-me/">About</HeaderLink>
      <HeaderLink to="/category/photographs/">Photographs</HeaderLink>
    </div>
  </nav>
);

export default Nav;
