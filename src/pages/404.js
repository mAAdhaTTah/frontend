import React from 'react';
import { withSEO } from '../decorators';
import { Main } from '../components';

const NotFoundPage = () => (
  <Main>
    <h1>NOT FOUND</h1>
    <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
  </Main>
);

export default NotFoundPage
  |> withSEO(() => ({
    // @TODO(mAAdhaTTah) get from... somewhere?
    title: 'Page Not Found',
    metas: [],
    schema: '',
  }));
