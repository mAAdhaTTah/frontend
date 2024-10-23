import { FC } from 'react';
import {
  FaFacebook,
  FaLinkedin,
  FaGithubSquare,
  FaBars,
  FaTimes,
} from 'react-icons/fa';

const keyToIcon = {
  facebook: { Component: FaFacebook, color: '#3b5998' },
  linkedin: { Component: FaLinkedin, color: '#4875b4' },
  github: { Component: FaGithubSquare, color: '#333' },
  burger: { Component: FaBars },
  x: { Component: FaTimes },
} as const;

export const Icon: FC<{
  icon: keyof typeof keyToIcon;
  alt: string;
  small?: boolean;
}> = ({ icon, alt, small = false }) => {
  // @ts-expect-error TS(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  const { Component, color } = keyToIcon[icon];
  return (
    <Component
      className={small ? 'text-lg' : 'text-4xl'}
      style={{ color }}
      title={alt}
    />
  );
};
