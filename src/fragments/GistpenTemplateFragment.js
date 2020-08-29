export default `
  fragment GistpenTemplateFragment on wordpress__intraxia_repos {
    id: wordpress_id
    description
    status
    slug
    created: created_at(formatString: "MMMM Do, YYYY")
    blobs {
      id: wordpress_id
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
