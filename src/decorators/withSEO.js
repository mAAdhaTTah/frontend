import Head from 'next/head';
import PropTypes from 'prop-types';
import getDisplayName from 'react-display-name';

export const SEO = ({ title, metas, schemas, children }) => (
  <>
    <Head>
      <title>{title}</title>
      {metas.map(meta => (
        // One of these will be defined.
        <meta key={meta.name ?? meta.property} {...meta} />
      ))}
      {schemas.map(schema => (
        <script
          type="application/ld+json"
          key={schema}
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema),
          }}
        ></script>
      ))}
    </Head>
    {children}
  </>
);

SEO.propTypes = {
  title: PropTypes.string.isRequired,
  metas: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.exact({
        name: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
      }),
      PropTypes.exact({
        property: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
      }),
    ]).isRequired,
  ).isRequired,
  schemas: PropTypes.arrayOf(PropTypes.object).isRequired,
  children: PropTypes.node,
};

const defaultGetSEOProps = ({ seo }) => ({
  title: seo.title,
  metas: seo.metas,
  schemas: seo.schemas,
});

const withSEO =
  (getSEOProps = defaultGetSEOProps) =>
  Component => {
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
