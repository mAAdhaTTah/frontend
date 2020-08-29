export default `
  fragment MediaImage on wordpress__wp_media {
    id: wordpress_id
    alt: alt_text
    url: source_url
    src: localFile {
      name
      image: childImageSharp {
        fluid(maxWidth: 960) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;
