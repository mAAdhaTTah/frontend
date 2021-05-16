import { useEffect, useRef } from 'react';
import { useSpring, animated } from 'react-spring';
import cc from 'classcat';
import Image from 'next/image';
import TypeIt from 'typeit';
import { PrimaryHeading, Icon, SecondaryHeading } from '../theme';
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
  fullScreen,
  headerImage,
  avatarImage,
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
      const minWidth = windowWidth < 768 ? 0 : 352;

      animate.start({
        to: { width: fullScreen ? windowWidth : minWidth },
      });
    };

    handler();

    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, [fullScreen]);

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
    <>
      <animated.header
        ref={header}
        style={{ ...style }}
        className={cc([
          'flex',
          'flex-col',
          'print:hidden',
          'relative',
          'h-screen',
          'overflow-hidden',
          'w-0',
          {
            'lg:w-88': !fullScreen,
            'lg:w-full': fullScreen
          }
        ])}
      >
        <div className="h-screen overflow-hidden relative">
          <Image
            {...headerImage}
            priority
            layout="fill"
            objectFit="cover"
            objectPosition="center center"
            style={{
              position: 'absolute',
              top: '0px',
              left: '0px',
              width: '100%',
              height: '100%',
            }}
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
                component={fullScreen ? 'h1' : 'div'}
                ref={subtitleRef}
              >
                {description}
              </SecondaryHeading>
            </div>
          </div>
        </div>
      </animated.header>
      <Nav />
    </>
  );
};

export default Header;
