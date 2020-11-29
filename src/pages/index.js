import { getLayoutProps } from '../api';
import { shared } from '../config';
import { withSEO } from '../decorators';

const Home = () => null;

export const getStaticProps = async () => {
  const response = await fetch(
    `https://${shared.WP_API_DOMAIN}/wp-json/wp/v2/pages/5338`,
  );
  const seo = await response.json();

  return {
    props: {
      layout: await getLayoutProps(),
      seo: {
        title: seo.title.rendered,
        metas: seo.yoast_meta,
        schemas: seo.yoast_json_ld,
      },
    },
  };
};

export default withSEO(({ seo }) => ({
  title: seo.title,
  metas: seo.metas,
  schemas: seo.schemas,
}))(Home);
