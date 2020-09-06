import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import getDisplayName from 'react-display-name';
import { SiteMeta } from '../components';

const SEO = ({ title, metas, schemas, children }) => (
  <>
    <SiteMeta
      render={site => (
        // @TODO(James) get SEO title from BE
        <Helmet>
          <title>
            {title} | {site.name}
          </title>
          {metas.map((meta, i) => (
            // One of these will be defined.
            <meta
              key={meta.name ?? meta.property}
              name={meta.name ?? undefined}
              property={meta.property ?? undefined}
              content={meta.content}
            />
          ))}
          {schemas.map(schema => (
            <script type="application/ld+json" key={schema}>
              {schema}
            </script>
          ))}
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
  schemas: PropTypes.arrayOf(PropTypes.string).isRequired,
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
