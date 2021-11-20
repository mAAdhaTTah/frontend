import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';
import { useTransition, animated } from 'react-spring';
import Header from './Header';

export const Layout = ({ header, children }) => {
  const opacityRef = useRef(1);
  const transitions = useTransition(children, {
    key: header.pathname,
    from: { opacity: opacityRef.current },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { mass: 1, tension: 150, friction: 30 },
  });

  useEffect(() => {
    // Next render, fade in.
    opacityRef.current = 0;
  }, []);

  return (
    <div className="flex flex-row">
      <Header
        title={header.title}
        description={header.description}
        links={header.links}
        headerImage={header.backgroundImage}
        avatarImage={header.avatarImage}
        fullScreen={header.fullScreen}
      />
      <div className="relative flex-grow">
        {transitions((props, item) => (
          <animated.div style={props} className={'absolute w-full'}>
            {item}
          </animated.div>
        ))}
      </div>
    </div>
  );
};

Layout.propTypes = {
  header: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    backgroundImage: PropTypes.object.isRequired,
    avatarImage: PropTypes.object.isRequired,
    links: PropTypes.array.isRequired,
    fullScreen: PropTypes.bool.isRequired,
  }).isRequired,
  children: PropTypes.node,
};
