import PropTypes from 'prop-types';
import { useTransition, animated } from 'react-spring';
import Header from './Header';
import { headerImage, avatarImage } from './images';

export const Layout = ({ pathname, site, children }) => {
  const transitions = useTransition(children, {
    from: { position: 'absolute', width: '100%', opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { mass: 1, tension: 150, friction: 30 },
  });

  return (
    <div className="flex flex-row">
      <Header
        title={site.name}
        description={site.description}
        fullScreen={pathname === '/'}
        headerImage={headerImage}
        avatarImage={avatarImage}
      />
      <div className="relative flex-grow h-screen overflow-scroll">
        {transitions((props, item) => (
          <animated.div style={props}>{item}</animated.div>
        ))}
      </div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
};
