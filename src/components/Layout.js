import '../css/index.css';
import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';
import Header from './Header';

const Layout = ({ path, children }) => (
  <SiteMeta
    render={site => (
      <>
        <Helmet titleTemplate={`%s | ${site.name}`} defaultTitle={site.name}>
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
