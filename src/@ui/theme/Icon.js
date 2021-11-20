import PropTypes from 'prop-types';
import { FaFacebook, FaLinkedin, FaGithubSquare, FaBars } from 'react-icons/fa';

const keyToIcon = {
  facebook: { Component: FaFacebook, color: '#3b5998' },
  linkedin: { Component: FaLinkedin, color: '#4875b4' },
  github: { Component: FaGithubSquare, color: '#333' },
  burger: { Component: FaBars },
};

const largeClassName = 'text-4xl';
const smallClassName = 'text-lg';

export const Icon = ({ icon, alt, small = false }) => {
  const { Component, color } = keyToIcon[icon];
  const className = small ? smallClassName : largeClassName;
  return <Component className={className} style={{ color }} alt={alt} />;
};

Icon.propTypes = {
  icon: PropTypes.oneOf(Object.keys(keyToIcon)),
  alt: PropTypes.string.isRequired,
  small: PropTypes.bool,
};
