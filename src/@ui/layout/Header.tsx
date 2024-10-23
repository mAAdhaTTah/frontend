import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';
import cc from 'classcat';
import Image from 'next/image';
import TypeIt from 'typeit';
import { VisuallyHidden } from '@react-aria/visually-hidden';
import { PrimaryHeading, Icon, SecondaryHeading } from '@ui/theme';

const SocialIcon = ({ icon, to }: any) => (
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
    <VisuallyHidden>Opens in a new tab</VisuallyHidden>
  </a>
);

const SocialIcons = ({ fullScreen }: any) => (
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

export const Header = ({
  title,
  description,
  fullScreen,
  backgroundImage,
  avatarImage,
  disableTyping = false,
}: any) => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const runningRef = useRef(false);

  useEffect(() => {
    if (disableTyping || runningRef.current) {
      return;
    }

    runningRef.current = true;

    // @ts-expect-error TS(2531) FIXME: Object is possibly 'null'.
    titleRef.current.innerText = '';
    // @ts-expect-error TS(2345) FIXME: Argument of type 'null' is not assignable to param... Remove this comment to see the full error message
    const subtitleType = new TypeIt(subtitleRef.current, {
      lifeLike: true,
      cursor: false,
      afterComplete: () => (runningRef.current = false),
    });

    // @ts-expect-error TS(2345) FIXME: Argument of type 'null' is not assignable to param... Remove this comment to see the full error message
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
  }, [disableTyping]);

  return (
    <div
      className={cc(['print:hidden', 'h-screen', 'w-full', 'overflow-hidden'])}
    >
      <header className={cc(['relative', 'print:hidden'])}>
        <div className="h-screen overflow-hidden relative">
          <Image
            {...backgroundImage}
            priority
            className="absolute h-full w-full top-0 left-0 right-0 bottom-0 object-cover object-center"
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
                'h-48',
                'rounded-full',
                'overflow-hidden',
                'grow-0',
                'transition-width',
                'ease-in-out',
                {
                  'lg:w-48': fullScreen,
                },
              ])}
            >
              <Image {...avatarImage} priority />
            </div>
            <div className={cc(['font-muli', 'lg:ml-5', 'grow'])}>
              {/* @ts-expect-error*/}
              <PrimaryHeading
                component={fullScreen ? 'h1' : 'div'}
                ref={titleRef}
              >
                {title}
              </PrimaryHeading>
              <SocialIcons fullScreen={fullScreen} />
              {/* @ts-expect-error*/}
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
    </div>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  backgroundImage: PropTypes.object.isRequired,
  avatarImage: PropTypes.object.isRequired,
  fullScreen: PropTypes.bool.isRequired,
  disableTyping: PropTypes.bool,
};
