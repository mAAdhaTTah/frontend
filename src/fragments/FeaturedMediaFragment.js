export default `    media: featured_media {
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
    }`;
