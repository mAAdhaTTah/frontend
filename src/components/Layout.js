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
        </Helmet>
        <Header
          title={site.name}
          description={site.description}
          fullScreen={path === '/'}
        />
        {path !== '/' ? (
          <div className="container mx-auto pt-5 print:pt-0 print:mx-0 print:max-w-full">
            {children}
          </div>
        ) : null}
      </>
    )}
  />
);

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
