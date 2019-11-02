import React from 'react';
import { graphql } from 'gatsby';
import { Day, Main } from '../components';
import { withSEO } from '../decorators';

const ReadingPage = ({ data }) => (
  <Main>
    {data.reading.nodes.map(({ day, links }) => (
      <Day key={day} day={day} links={links} />
    ))}
  </Main>
);

export const pageQuery = graphql`
  query ReadingPageQuery {
    reading: allReadDay {
      nodes {
        day(formatString: "MMM Do, YYYY")
        links {
          id
          url
          title
          excerpt
          readAt(formatString: "hh:mm a, MMM Do")
        }
      }
    }
    page: wordpressPage(wordpress_id: { eq: 5941 }) {
      metas: yoast_meta {
        name
        property
        content
      }
      schema: yoast_json_ld
    }
  }
`;

export default ReadingPage
  |> withSEO(({ data }) => ({
    title: 'Reading',
    // @TODO(mAAdhaTTah) shouldn't need to check...
    metas: data.page?.metas ?? [],
    schema: data.page?.schema ?? '',
  }));
