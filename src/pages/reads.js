import React from 'react';
import { graphql } from 'gatsby';
import { Day } from '../components';

const ReadsPage = ({ data }) => (
  <>
    {data.reads.nodes.map(({ day, links }) => (
      <Day key={day} day={day} links={links} />
    ))}
  </>
);

export const pageQuery = graphql`
  query ReadsPageQuery {
    reads: allReadDay {
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

export default ReadsPage;
