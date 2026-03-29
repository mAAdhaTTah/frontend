import PropTypes from 'prop-types';
import {
  FaFacebook,
  FaLinkedin,
  FaGithubSquare,
  FaBars,
  FaTimes,
} from 'react-icons/fa';

const keyToIcon = {
  facebook: { Component: FaFacebook },
  linkedin: { Component: FaLinkedin },
  github: { Component: FaGithubSquare },
  burger: { Component: FaBars },
  x: { Component: FaTimes },
};

export const Icon = ({ icon, alt, small = false }) => {
  const { Component } = keyToIcon[icon];
  return <Component className={small ? 'text-lg' : 'text-4xl'} alt={alt} />;
};

Icon.propTypes = {
  icon: PropTypes.oneOf(Object.keys(keyToIcon)),
  alt: PropTypes.string.isRequired,
  small: PropTypes.bool,
};
