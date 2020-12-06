import React from 'react';
import { getLayoutProps } from '../api';
import { Main } from '../components';
import { withSEO } from '../decorators';

const NotFoundPage = () => (
  <Main>
    <h1>NOT FOUND</h1>
    <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
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
  title: 'Page Not Found',
  metas: [],
  schemas: [],
}))(NotFoundPage);
