import React, { useEffect, useRef } from 'react';
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
import Image from 'next/image';
import TypeIt from 'typeit';
import Nav from './Nav';

const titleClassName = cc(['text-4xl', 'md:text-5xl', 'font-bold', 'mb-3']);

const SocialIcon = ({ icon, to, color }) => (
  <a
    href={to}
    style={{ color }}
    className={cc(['text-4xl', 'rounded-lg', 'border-transparent'])}
  >
    {icon}
  </a>
);

const SocialIcons = () => (
  <div
    className={cc([
      'text-xl',
      'md:text-3xl',
      'mb-3',
      'flex',
      'flex-row',
      'align-center',
      'justify-center',
      'lg:justify-start',
      'text-center',
    ])}
  >
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
);

const animationConfig = { mass: 1, tension: 150, friction: 30 };

const Header = ({
  title,
  description,
  fullScreen,
  headerImage,
  avatarImage,
}) => {
  const header = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  const [headerProps, setHeader] = useSpring(() => ({}));

  useEffect(() => {
    const currentHeight = header.current.style.height;
    header.current.style.height = '';
    setHeader({
      config: animationConfig,
      height: header.current.offsetHeight,
    });
    header.current.style.height = currentHeight;
  }, [fullScreen, setHeader]);

  useEffect(() => {
    titleRef.current.innerText = '';
    const subtitleType = new TypeIt(subtitleRef.current, {
      lifeLike: true,
      cursor: false,
    });

    const titleType = new TypeIt(titleRef.current, {
      lifeLike: true,
      cursor: false,
      afterComplete: () => subtitleType.go(),
    })
      .type('James Dig')
      .pause(750)
      .delete(1)
      .pause(500)
      .type('G')
      .pause(350)
      .type('ioia');

    titleType.go();
  }, []);

  return (
    <animated.header
      ref={header}
      style={{ ...headerProps }}
      className={cc([
        'flex',
        'flex-col',
        'relative',
        'print:hidden',
        {
          'h-screen': fullScreen,
          'h-80': !fullScreen,
        },
      ])}
    >
      <div className="h-screen overflow-hidden relative">
        <img
          src={headerImage.src}
          alt={headerImage.alt}
          style={{
            position: 'absolute',
            top: '0px',
            left: '0px',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center center',
          }}
        />
      </div>
      <div
        className={cc([
          'absolute',
          'bg-etched',
          'rounded-lg',
          'text-center',
          'lg:text-left',
          'inline-flex',
          'lg:flex',
          'flex-row',
          'items-center',
          'justify-center',
          'lg:justify-start',
          'w-full',
          'max-w-xs',
          'sm:max-w-sm',
          'lg:max-w-md',
          'pin-center',
          '-mt-8',
          'm-auto',
        ])}
      >
        <div
          className={cc([
            'flex',
            'flex-row',
            'items-center',
            'justify-center',
            'p-3',
            'sm:p-5',
          ])}
        >
          <div className="w-48 h-48 rounded-full overflow-hidden hidden lg:block flex-grow-0">
            <Image
              src={avatarImage.src}
              alt={avatarImage.alt}
              width={360}
              height={360}
            />
          </div>
          <div className={cc(['font-header', 'lg:ml-5', 'flex-grow'])}>
            {fullScreen ? (
              <h1 className={titleClassName} ref={titleRef}>
                {title}
              </h1>
            ) : (
              <div className={titleClassName} ref={titleRef}>
                {title}
              </div>
            )}
            <SocialIcons />
            <h2
              className={cc([
                'relative',
                'text-xl',
                'md:text-3xl',
                'font-medium',
              ])}
              ref={subtitleRef}
            >
              {description}
            </h2>
          </div>
        </div>
      </div>
      <Nav />
    </animated.header>
  );
};

export default Header;
