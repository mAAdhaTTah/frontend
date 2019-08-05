import '../css/index.css';
import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';
import Header from './Header';

const Layout = ({ path, children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        wordpressSiteMetadata(home: { eq: "https://jamesdigioia.com" }) {
          name
          description
        }
      }
    `}
    render={data => (
      <>
        <Helmet
          title={data.wordpressSiteMetadata.name}
          meta={[
            {
              name: 'description',
              content: data.wordpressSiteMetadata.description,
            },
          ]}
        >
          <html lang="en" />
        </Helmet>
        <Header
          title={data.wordpressSiteMetadata.name}
          description={data.wordpressSiteMetadata.description}
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
