import { withSEO } from '../decorators';

const Home = () => null;

export default Home
  |> withSEO(({ data }) => ({
    title: data.site.siteMetadata.description,
    metas: data.page.metas.map(meta => ({
      ...meta,
      content: meta.content.replace('Home', data.site.siteMetadata.description),
    })),
    schemas: data.page.schemas,
  }));
