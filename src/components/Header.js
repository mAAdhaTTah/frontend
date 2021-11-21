import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';
import { useSpring, animated } from 'react-spring';
import cc from 'classcat';
import Image from 'next/image';
import TypeIt from 'typeit';
import { PrimaryHeading, Icon, SecondaryHeading } from '@ui/theme';
import Nav from './Nav';

const SocialIcon = ({ icon, to }) => (
  <a
    className={cc([
      'border-2',
      'border-transparent',
      'focus:border-primary',
      'focus:outline-none',
    ])}
    href={to}
    target="_blank"
    rel="noopener noreferrer"
  >
    {icon}
  </a>
);

const SocialIcons = ({ fullScreen }) => (
  <div
    className={cc([
      'text-xl',
      'md:text-3xl',
      'mb-3',
      'flex',
      'flex-row',
      'align-center',
      'justify-center',
      { 'lg:justify-start': fullScreen },
      'text-center',
    ])}
  >
    <SocialIcon
      icon={<Icon icon="facebook" alt="Facebook" />}
      to="https://www.facebook.com/james.digioia"
    />
    <SocialIcon
      icon={<Icon icon="linkedin" alt="LinkedIn" />}
      to="https://www.linkedin.com/in/jamesdigioia"
    />
    <SocialIcon
      icon={<Icon icon="github" alt="GitHub" />}
      to="https://github.com/mAAdhaTTah/"
    />
  </div>
);

const animationConfig = { mass: 1, tension: 150, friction: 30 };

const Header = ({
  title,
  description,
  links,
  fullScreen,
  backgroundImage,
  avatarImage,
  disableTyping = false,
}) => {
  const header = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  const [style, animate] = useSpring(() => ({
    config: animationConfig,
  }));

  useEffect(() => {
    const handler = () => {
      const windowWidth = window.document.body.offsetWidth;
      const minWidth = windowWidth < 992 ? 0 : 352;

      animate.start({
        to: { width: fullScreen ? windowWidth : minWidth },
      });
    };

    handler();

    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, [animate, fullScreen]);

  useEffect(() => {
    if (disableTyping) {
      return;
    }

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
    <animated.div
      ref={header}
      style={style}
      className={cc([
        'h-screen',
        'w-0',
        {
          'xl:w-88': !fullScreen,
          'xl:w-full': fullScreen,
        },
      ])}
    >
      <header
        className={cc([
          'flex',
          'flex-col',
          'print:hidden',
          'fixed',
          'h-screen',
          'overflow-hidden',
          'w-inherit',
        ])}
      >
        <div className="h-screen overflow-hidden relative">
          <Image
            {...backgroundImage}
            priority
            layout="fill"
            objectFit="cover"
            objectPosition="center center"
          />
        </div>
        <div
          className={cc([
            'absolute',
            'bg-etched',
            'rounded-lg',
            'text-center',
            { 'lg:text-left': fullScreen },
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
            'w-full',
          ])}
        >
          <div
            className={cc([
              'flex',
              'flex-row',
              'items-center',
              'justify-center',
              'w-full',
              {
                'p-2': !fullScreen,
                'p-3': fullScreen,
                'sm:p-5': fullScreen,
              },
            ])}
          >
            <div
              className={cc([
                'w-0',
                'lg:w-48',
                'h-48',
                'rounded-full',
                'overflow-hidden',
                'flex-grow-0',
                'transition-width',
                'ease-in-out',
                {
                  'lg:w-0': !fullScreen,
                },
              ])}
            >
              <Image
                priority
                src={avatarImage.src}
                alt={avatarImage.alt}
                width={360}
                height={360}
              />
            </div>
            <div className={cc(['font-muli', 'lg:ml-5', 'flex-grow'])}>
              <PrimaryHeading
                component={fullScreen ? 'h1' : 'div'}
                ref={titleRef}
              >
                {title}
              </PrimaryHeading>
              <SocialIcons fullScreen={fullScreen} />
              <SecondaryHeading
                component={fullScreen ? 'h2' : 'div'}
                ref={subtitleRef}
              >
                {description}
              </SecondaryHeading>
            </div>
          </div>
        </div>
      </header>
      <Nav links={links} />
    </animated.div>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  backgroundImage: PropTypes.object.isRequired,
  avatarImage: PropTypes.object.isRequired,
  links: PropTypes.array.isRequired,
  fullScreen: PropTypes.bool.isRequired,
  disableTyping: PropTypes.bool,
};

export default Header;
