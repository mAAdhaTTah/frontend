import { getLayoutProps, getSeoByPageId } from '../api';
import { withSEO } from '../decorators';

const Home = () => null;

export const getStaticProps = async () => {
  return {
    props: {
      layout: await getLayoutProps(),
      seo: await getSeoByPageId(5338),
    },
  };
};

export default withSEO()(Home);
