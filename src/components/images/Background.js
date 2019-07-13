import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';

const BackgroundImage = ({ className }) => (
  <StaticQuery
    // @TODO(mAAdhaTTah) get header from API
    query={graphql`
      query {
        backgroundImage: file(relativePath: { eq: "header.jpg" }) {
          childImageSharp {
            fluid(maxWidth: 1600) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    `}
    render={data => (
      <Img
        className={className}
        fluid={data.backgroundImage.childImageSharp.fluid}
      />
    )}
  />
);

export default BackgroundImage;
