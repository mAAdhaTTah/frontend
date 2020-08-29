// @TODO(mAAdhaTTah) dedupe from gatsby-transformer-sharp
export default `
  fragment GatsbyImageSharpFluid on ImageSharpFluid {
    base64
    aspectRatio
    src
    srcSet
    sizes
  }
`;
