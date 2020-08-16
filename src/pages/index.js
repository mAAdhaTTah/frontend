import { graphql } from 'gatsby';
import { withSEO } from '../decorators';

const Home = () => null;

export const pageQuery = graphql`
  query HomePageQuery {
    page: wordpressPage(wordpress_id: { eq: 5338 }) {
      metas: yoast_meta {
        name
        property
        content
      }
      schemas: yoast_json_ld
    }
    site {
      siteMetadata {
        description
      }
    }
  }
`;

export default Home
  |> withSEO(({ data }) => ({
    title: data.site.siteMetadata.description,
    metas: data.page.metas.map(meta => ({
      ...meta,
      content: meta.content.replace('Home', data.site.siteMetadata.description),
    })),
    schemas: data.page.schemas,
  }));
