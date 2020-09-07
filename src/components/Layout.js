import '../css/index.css';
import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { useTransition, animated } from 'react-spring';
import Header from './Header';
import SiteMeta from './SiteMeta';

const Layout = ({ location, children }) => {
  const transitions = useTransition(children, () => location.pathname, {
    from: { position: 'absolute', width: '100%', opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { mass: 1, tension: 150, friction: 30 },
  });

  return (
    <SiteMeta
      render={site => (
        <>
          <Helmet>
            <html lang="en" />
            <meta name="description" content={site.description} />
            <meta charSet="utf-8" />
            <link rel="dns-prefetch" href="//fonts.googleapis.com" />
            <link rel="dns-prefetch" href="//jamesdigioia.s3.amazonaws.com" />
            <link
              rel="alternate"
              type="application/json"
              title="James DiGioia &raquo; JSON Feed"
              href="https://jamesdigioia.com/feed/json/"
            />
            <link
              rel="alternate"
              type="application/rss+xml"
              title="James DiGioia Feed"
              href="https://jamesdigioia.com/feed/"
            />
            {/* @TODO(James) get from API */}
            <link
              rel="icon"
              href="https://jamesdigioia.s3.amazonaws.com/uploads/2014/07/cropped-new-avatar-90x90.jpg"
              sizes="32x32"
            />
            <link
              rel="icon"
              href="https://jamesdigioia.s3.amazonaws.com/uploads/2014/07/cropped-new-avatar.jpg"
              sizes="192x192"
            />
            <link
              rel="apple-touch-icon"
              href="https://jamesdigioia.s3.amazonaws.com/uploads/2014/07/cropped-new-avatar.jpg"
            />
          </Helmet>
          <Header
            title={site.name}
            description={site.description}
            fullScreen={location.pathname === '/'}
          />
          {transitions.map(({ item, key, props }) => (
            <animated.div key={key} style={props}>
              {item}
            </animated.div>
          ))}
        </>
      )}
    />
  );
};

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
