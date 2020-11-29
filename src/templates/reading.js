import React from 'react';
import { Day, Main } from '../components';
import { withSEO } from '../decorators';

const ReadingPage = ({ data }) => (
  <Main>
    {data.reading.nodes.map(({ day, links }) => (
      <Day key={day} day={day} links={links} />
    ))}
  </Main>
);

export default ReadingPage
  |> withSEO(({ data }) => ({
    title: 'Reading',
    // @TODO(mAAdhaTTah) shouldn't need to check...
    metas: data.page?.metas ?? [],
    schemas: data.page?.schemas ?? [],
  }));
