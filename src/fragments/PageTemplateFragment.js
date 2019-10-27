import GatsbyImageSharpFluid from './GatsbyImageSharpFluid';

export default `
  ${GatsbyImageSharpFluid}

  fragment PageTemplateFragment on wordpress__PAGE {
    id: wordpress_id
    slug
    title
    content
    media: featured_media {
      id: wordpress_id
      alt: alt_text
      src: localFile {
        name
        image: childImageSharp {
          fluid(maxWidth: 960) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  }
`;
