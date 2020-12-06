import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
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

const HeaderLink = ({ to, children }) => {
  const { asPath } = useRouter();

  return (
    <Link href={to}>
      <a
        href={to}
        className={cc([headerClass, asPath === to && 'bg-tertiary'])}
      >
        {children}
      </a>
    </Link>
  );
};

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
