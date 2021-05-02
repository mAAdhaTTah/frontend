import { getLayoutProps } from '../api';
import { Main } from '../components';
import { withSEO } from '../decorators';

const NotFoundPage = () => (
  <Main>
    <h1>SERVER ERROR</h1>
    <p>Something terrible happened...</p>
  </Main>
);

export const getStaticProps = async () => {
  return {
    props: {
      layout: await getLayoutProps(),
    },
  };
};

export default withSEO(() => ({
  // @TODO(mAAdhaTTah) get from... somewhere?
  title: 'Server Error',
  metas: [],
  schemas: [],
}))(NotFoundPage);
