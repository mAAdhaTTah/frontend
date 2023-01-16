import { useState, useEffect, useRef } from 'react';
import { FocusScope } from '@react-aria/focus';
import { VisuallyHidden } from '@react-aria/visually-hidden';
import { useKey, useOutsideClick } from 'rooks';
import Link from 'next/link';
import { useRouter } from 'next/router';
import cc from 'classcat';
import { Icon } from '@ui/theme';

const headerLinkClass = cc([
  'no-underline',
  'text-lightg',
  'border-b',
  'border-darkg',
  'hover:border-lightg',
  'focus:border-lightg',
  'text-lg',
  'text-center',
  'font-ovo',
  'leading-tight',
]);

const HeaderLink = ({ to, onClick, children }) => {
  const { asPath } = useRouter();

  return (
    <div className="p-2 text-center">
      <Link
        href={to}
        onClick={onClick}
        className={cc([
          headerLinkClass,
          asPath === to && 'border-b border-primary',
        ])}
      >
        {children}
      </Link>
    </div>
  );
};

const navClass = cc(['fixed', 'top-2', 'left-2', 'z-50']);

const Menu = ({ links, open, onClose }) => {
  const navRef = useRef();
  const [forward, setForward] = useState(open);
  useOutsideClick(navRef, onClose, open);
  useKey(27, onClose, { when: open });

  useEffect(() => {
    if (open === forward) {
      return;
    }

    if (forward) {
      const handler = () => setForward(open);

      navRef.current.addEventListener('animationend', handler);
      return () => navRef.current.removeEventListener('animationend', handler);
    } else {
      setForward(open);
    }
  }, [forward, open]);

  return (
    forward && (
      <FocusScope contain restoreFocus autoFocus>
        <nav
          ref={navRef}
          className={cc([
            'mt-4',
            'mx-8',
            'flex',
            'flex-col',
            'justify-end',
            'w-24',
            'fixed',
            'left-0',
            'bg-darkg',
            'rounded',
            'transition',
            'origin-top-left',
            { 'scale-0': !open, 'scale-1': open },
          ])}
        >
          {links.map((link, i) => (
            <HeaderLink onClick={onClose} to={link.to} key={i}>
              {link.text}
            </HeaderLink>
          ))}
        </nav>
      </FocusScope>
    )
  );
};

const Nav = ({ links }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={navClass}>
      <button
        className={cc([
          'rounded-full',
          'bg-darkg',
          'text-secondary',
          'p-1',
          'border-2',
          'border-darkg',
          'focus:outline-none',
          'focus:border-lightg',
        ])}
        onClick={() => setOpen(open => !open)}
      >
        <Icon icon="burger" small alt="" />
        <VisuallyHidden>Open menu</VisuallyHidden>
      </button>
      <Menu open={open} onClose={() => setOpen(false)} links={links} />
    </div>
  );
};

export default Nav;
