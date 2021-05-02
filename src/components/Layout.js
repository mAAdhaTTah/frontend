import PropTypes from 'prop-types';
import { useTransition, animated } from 'react-spring';
import Header from './Header';

export const Layout = ({ pathname, site, children }) => {
  const transitions = useTransition(children, () => pathname, {
    from: { position: 'absolute', width: '100%', opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { mass: 1, tension: 150, friction: 30 },
  });

  return (
    <>
      <Header
        title={site.name}
        description={site.description}
        fullScreen={pathname === '/'}
        headerImage={{
          // TODO(James) fix these paths
          src: 'https://static.jamesdigioia.com/uploads/2020/11/header-1.jpg',
          alt: 'background image',
        }}
        avatarImage={{
          // TODO(James) fix these paths
          src:
            'https://static.jamesdigioia.com/uploads/2015/02/new-avatar-sq.jpg',
          alt: 'avatar',
        }}
      />
      {transitions.map(({ item, key, props }) => (
        <animated.div key={key} style={props}>
          {item}
        </animated.div>
      ))}
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
};
