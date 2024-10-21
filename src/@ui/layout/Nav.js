import { useState, useRef } from 'react';
import { FocusScope } from '@react-aria/focus';
import { VisuallyHidden } from '@react-aria/visually-hidden';
import { useKey, useOutsideClick } from 'rooks';
import { Link } from 'next-view-transitions';
import cc from 'classcat';
import { Icon } from '@ui/theme';
import { Transition } from 'react-transition-group';
import { usePathname } from 'next/navigation';

const NavButton = ({ onClick, open }) => {
  return (
    <button
      className={cc([
        'fixed',
        'top-2',
        'left-2',
        'rounded-full',
        'bg-darkg',
        'text-secondary',
        'p-1',
        'focus:outline-lightg',
        'z-50',
      ])}
      onClick={onClick}
    >
      <Icon icon={open ? 'x' : 'burger'} small alt="" />
      <VisuallyHidden>{open ? 'Close' : 'Open'} menu</VisuallyHidden>
    </button>
  );
};

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
  const pathname = usePathname();

  return (
    <li className="py-2 text-center">
      <Link
        href={to}
        onClick={onClick}
        className={cc([
          headerLinkClass,
          pathname === to && 'border-b border-primary',
        ])}
      >
        {children}
      </Link>
    </li>
  );
};

const transitionClasses = {
  entering: 'translate-x-0',
  entered: 'translate-x-0',
  exiting: '-translate-x-full',
  exited: '-translate-x-full',
};

const Menu = ({ links, open, onClose }) => {
  const menuRef = useRef();
  useKey(27, onClose, { when: open });

  return (
    <Transition
      nodeRef={menuRef}
      in={open}
      appear={open}
      timeout={{
        appear: 0,
        enter: 500,
        exit: 500,
      }}
      mountOnEnter
      unmountOnExit
    >
      {state => (
        <FocusScope contain restoreFocus autoFocus>
          <nav
            ref={menuRef}
            className={cc([
              'flex',
              'flex-col',
              'justify-start',
              'w-88',
              'fixed',
              'top-0',
              'left-0',
              'h-screen',
              'bg-darkg',
              'rounded-r-lg',
              'transition-transform',
              'duration-500',
              'ease-out',
              'z-50',
              transitionClasses[state],
            ])}
          >
            <menu className={cc(['pt-5'])}>
              {links.map((link, i) => (
                <HeaderLink onClick={onClose} to={link.to} key={i}>
                  {link.text}
                </HeaderLink>
              ))}
            </menu>
          </nav>
          <NavButton open={open} onClick={onClose} />
        </FocusScope>
      )}
    </Transition>
  );
};

const Nav = ({ links }) => {
  const [open, setOpen] = useState(false);
  const navRef = useRef();
  const onClose = () => setOpen(false);
  useOutsideClick(navRef, onClose, open);

  return (
    <div ref={navRef}>
      <NavButton onClick={() => setOpen(open => !open)} open={open} />
      <Menu open={open} onClose={onClose} links={links} />
    </div>
  );
};

export default Nav;
