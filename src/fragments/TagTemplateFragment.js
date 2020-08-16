export default `
  fragment PageTemplateFragment on wordpress__TAG {
    id: wordpress_id
    name
    slug
    link
    description
    count
    metas: yoast_meta {
      name
      property
      content
    }
    schemas: yoast_json_ld
  }
`;
