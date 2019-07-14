export default `
  fragment PostTemplateFragment on wordpress__POST {
    id: wordpress_id
    title
    slug
    excerpt
    date
    link
    content
    format
    categories {
      id
    }
    tags {
      id
    }
    author
  }
`;
