import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

const SiteMeta = ({ render }) => (
  <StaticQuery
    query={graphql`
      query LayoutQuery {
        site {
          siteMetadata {
            name
            description
          }
        }
      }
    `}
    render={data => render(data.site.siteMetadata)}
  />
);

export default SiteMeta;
