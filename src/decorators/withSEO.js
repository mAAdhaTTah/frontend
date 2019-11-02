import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import getDisplayName from 'react-display-name';
import { SiteMeta } from '../components';

const SEO = ({ title, children }) => (
  <>
    <SiteMeta
      render={site => (
        // @TODO(James) get SEO title from BE
        <Helmet title={`${title} | ${site.name}`} />
      )}
    />
    {children}
  </>
);

SEO.propTypes = {
  title: PropTypes.string.isRequired,
};

const withSEO = getSEOProps => Component => {
  const WithSEO = props => {
    return (
      <SEO {...getSEOProps(props)}>
        <Component {...props} />
      </SEO>
    );
  };

  WithSEO.displayName = `WithSEO(${getDisplayName(Component)})`;

  return WithSEO;
};

export default withSEO;
