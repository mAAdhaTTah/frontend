import React from 'react';
import { Link } from 'gatsby';
import cc from 'classcat';
import {
  FaFacebook,
  FaTwitterSquare,
  FaLinkedin,
  FaGooglePlusSquare,
  FaInstagram,
  FaTumblrSquare,
  FaGithubSquare,
} from 'react-icons/fa';
import { BackgroundImage, AvatarImage } from './images';

const headerClass = cc([
  'no-underline',
  'text-accent-dark',
  'hover:bg-accent-light',
  'text-lg',
  'p-5',
  'font-body',
  'leading-tight',
]);

const titleClassName = cc(['text-4xl', 'md:text-5xl', 'font-bold', 'my-3']);

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

const SocialIcon = ({ icon, to, color }) => (
  <a
    href={to}
    style={{ color }}
    className={cc(['text-4xl', 'rounded-lg', 'border-transparent'])}
  >
    {icon}
  </a>
);

const Header = ({ title, description, isHome }) => (
  <header
    className={cc([
      'relative',
      {
        'h-screen': isHome,
        'h-72': !isHome,
      },
    ])}
  >
    <BackgroundImage className={cc([{ 'h-72': !isHome, 'h-full': isHome }])} />
    <div
      className={cc([
        'absolute',
        'bg-etched-glass',
        'rounded-lg',
        'w-full',
        'text-center',
        'lg:text-left',
        'lg:max-w-md',
        'flex',
        'flex-row',
        {
          'pin-center': isHome,
          'pin-t': !isHome,
          'pin-x-center': !isHome,
        },
      ])}
    >
      <div
        className={cc([
          'm-5',
          'w-full',
          'flex',
          'flex-row',
          { 'h-48': !isHome },
        ])}
      >
        <div className="w-48 rounded-full overflow-hidden hidden lg:block">
          <AvatarImage />
        </div>
        <div
          className={cc(['font-header', 'ml-5', 'mt-2', 'w-full', 'lg:w-auto'])}
        >
          {isHome ? (
            <h1 className={titleClassName}>{title}</h1>
          ) : (
            <div className={titleClassName}>{title}</div>
          )}
          <div className={cc(['text-xl', 'md:text-3xl', 'mb-3'])}>
            <SocialIcon
              icon={<FaFacebook />}
              color="#3b5998"
              to="https://www.facebook.com/james.digioia"
            />
            <SocialIcon
              icon={<FaTwitterSquare />}
              color="#3cf"
              to="https://twitter.com/JamesDiGioia"
            />
            <SocialIcon
              icon={<FaLinkedin />}
              color="#4875b4"
              to="https://www.linkedin.com/in/jamesdigioia"
            />
            <SocialIcon
              icon={<FaGooglePlusSquare />}
              color="#c63d2d"
              to="https://plus.google.com/+JamesDiGioia"
            />
            <SocialIcon
              icon={<FaInstagram />}
              color="#4e433c"
              to="http://instagram.com/jamesdigioia"
            />
            <SocialIcon
              icon={<FaTumblrSquare />}
              color="#2b4964"
              to="http://jamesdigioia.tumblr.com/"
            />
            <SocialIcon
              icon={<FaGithubSquare />}
              color="#333"
              to="https://github.com/mAAdhaTTah/"
            />
          </div>
          <h2 className={`text-xl md:text-3xl font-medium`}>{description}</h2>
        </div>
      </div>
    </div>
    <nav
      className={cc([
        'bg-secondary-color',
        'pin-b-3',
        'relative',
        'h-16',
        {
          relative: isHome,
        },
      ])}
    >
      <div className="container mx-auto flex flex-row justify-end">
        <HeaderLink to="/">Home</HeaderLink>
        <HeaderLink to="/reads/">Reading</HeaderLink>
        <HeaderLink to="https://jamesdigioia.com/">Writing</HeaderLink>
      </div>
    </nav>
  </header>
);

export default Header;
