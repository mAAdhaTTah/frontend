import React from 'react';
import { graphql } from 'gatsby';
import { Day } from '../components';
import { withSEO } from '../decorators';

const ReadingPage = ({ data }) => (
  <>
    {data.reading.nodes.map(({ day, links }) => (
      <Day key={day} day={day} links={links} />
    ))}
  </>
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
  }
`;

export default ReadingPage
  |> withSEO(() => ({
    title: 'Reading',
  }));
