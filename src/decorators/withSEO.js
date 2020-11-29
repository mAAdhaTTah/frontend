import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import getDisplayName from 'react-display-name';

const SEO = ({ title, metas, schemas, children }) => (
  <>
    <Head>
      <title>{title}</title>
      {metas.map(meta => (
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
          {JSON.stringify(schema)}
        </script>
      ))}
    </Head>
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
    }),
  ).isRequired,
  schemas: PropTypes.arrayOf(PropTypes.object).isRequired,
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
