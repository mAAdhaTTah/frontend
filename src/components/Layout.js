import '../css/index.css';
import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Header from './Header';
import SiteMeta from './SiteMeta';

const Layout = ({ path, children }) => (
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
        </Helmet>
        <Header
          title={site.name}
          description={site.description}
          fullScreen={path === '/'}
        />
        {children}
      </>
    )}
  />
);

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
