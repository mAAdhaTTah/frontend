export default `
  fragment PageTemplateFragment on wordpress__PAGE {
    id: wordpress_id
    slug
    link
    title
    content
    wordpress_parent
  }
`;
