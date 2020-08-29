export default `
  fragment CategoryTemplateFragment on wordpress__CATEGORY {
    id: wordpress_id
    name
    slug
    description
    link
    parent_element {
      id: wordpress_id
      name
      slug
      description
      link
    }
    metas: yoast_meta {
      name
      property
      content
    }
    schemas: yoast_json_ld
  }
`;
