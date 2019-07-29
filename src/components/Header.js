import React, { useLayoutEffect, useRef } from 'react';
import { useSpring, animated } from 'react-spring';
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
import Nav from './Nav';
import { BackgroundImage, AvatarImage } from './images';

const titleClassName = cc(['text-4xl', 'md:text-5xl', 'font-bold', 'my-3']);

const SocialIcon = ({ icon, to, color }) => (
  <a
    href={to}
    style={{ color }}
    className={cc(['text-4xl', 'rounded-lg', 'border-transparent'])}
  >
    {icon}
  </a>
);

const animationConfig = { mass: 1, tension: 150, friction: 30 };

const Header = ({ title, description, fullScreen }) => {
  const header = useRef(null);
  const banner = useRef(null);
  const [headerProps, setHeader] = useSpring(() => ({}));

  useLayoutEffect(() => {
    const currentHeight = header.current.style.height;
    header.current.style.height = '';
    setHeader({
      config: animationConfig,
      height: header.current.offsetHeight,
    });
    header.current.style.height = currentHeight;
  }, [fullScreen]);

  return (
    <animated.header
      ref={header}
      style={{ ...headerProps }}
      className={cc([
        'flex',
        'flex-col',
        'relative',
        {
          'h-screen': fullScreen,
          'h-80': !fullScreen,
          'print:hidden': !fullScreen,
        },
      ])}
    >
      <BackgroundImage />
      <animated.div
        ref={banner}
        className={cc([
          'absolute',
          'bg-etched',
          'rounded-lg',
          'text-center',
          'lg:text-left',
          'flex',
          'flex-row',
          'p-5',
          'items-center',
          'justify-center',
          'w-full',
          'max-w-content',
          'pin-center',
          'm-auto',
          '-mt-8',
        ])}
      >
        <div
          className={cc([
            'w-full',
            'flex',
            'flex-row',
            'items-center',
            'justify-center',
            { 'h-48': !fullScreen },
          ])}
        >
          <div className="w-48 rounded-full overflow-hidden hidden lg:block">
            <AvatarImage />
          </div>
          <div
            className={cc([
              'font-header',
              'ml-5',
              'mt-2',
              'w-full',
              'lg:w-auto',
            ])}
          >
            {fullScreen ? (
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
      </animated.div>
      <Nav />
    </animated.header>
  );
};

export default Header;
