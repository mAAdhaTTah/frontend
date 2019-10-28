import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import getDisplayName from 'react-display-name';

const SEO = ({ title, children }) => (
  <>
    <Helmet>
      <title>{title}</title>
    </Helmet>
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
