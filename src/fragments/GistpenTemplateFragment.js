export default `
  fragment GistpenTemplateFragment on wordpress__intraxia_repos {
    id: wordpress_id
    description
    status
    blobs {
      id: wordpress_id
      size
      raw_url
      filename
      code
      language {
        id: wordpress_id
        display_name
        slug
      }
    }
  }
`;
