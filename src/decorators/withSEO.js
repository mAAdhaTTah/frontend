import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import getDisplayName from 'react-display-name';
import { SiteMeta } from '../components';

const SEO = ({ title, metas, schema, children }) => (
  <>
    <SiteMeta
      render={site => (
        // @TODO(James) get SEO title from BE
        <Helmet>
          <title>
            {title} | {site.name}
          </title>
          {metas.map((meta, i) => (
            <meta
              key={i}
              name={meta.name ?? undefined}
              property={meta.property ?? undefined}
              content={meta.content}
            />
          ))}
          <script type="application/ld+json">{schema}</script>
        </Helmet>
      )}
    />
    {children}
  </>
);

SEO.propTypes = {
  title: PropTypes.string.isRequired,
  metas: PropTypes.arrayOf(
    PropTypes.exact({
      name: PropTypes.string,
      property: PropTypes.string,
      content: PropTypes.string.isRequired,
    })
  ).isRequired,
  schema: PropTypes.string.isRequired,
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
