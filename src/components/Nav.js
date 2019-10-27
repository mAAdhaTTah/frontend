import React from 'react';
import { Link } from 'gatsby';
import cc from 'classcat';

const headerClass = cc([
  'no-underline',
  'text-darkg',
  'hover:bg-lightg',
  'text-lg',
  'p-5',
  'font-body',
  'leading-tight',
]);

const HeaderLink = ({ to, children }) => (
  <Link to={to} className={headerClass} activeClassName="bg-tertiary">
    {children}
  </Link>
);

const navClass = cc(['bg-secondary', 'h-16']);

const Nav = () => (
  <nav className={navClass}>
    <div className="container mx-auto flex flex-row justify-end">
      {/* @TODO(mAAdhaTTah) get menus from BE */}
      <HeaderLink to="/">Home</HeaderLink>
      <HeaderLink to="/reading/">Reading</HeaderLink>
      <HeaderLink to="/writing/">Writing</HeaderLink>
      <HeaderLink to="/gistpens/">Code</HeaderLink>
      <HeaderLink to="/resume/">Resume</HeaderLink>
      <HeaderLink to="/projects/">Projects</HeaderLink>
      <HeaderLink to="/about-me/">About</HeaderLink>
    </div>
  </nav>
);

export default Nav;
