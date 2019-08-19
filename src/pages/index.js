import React from 'react';
import { graphql } from 'gatsby';
import { Layout, Day } from '../components';

const IndexPage = ({ data }) => (
  <Layout>
    {data.reads.nodes.map(({ day, links }) => (
      <Day key={day} day={day} links={links} />
    ))}
  </Layout>
);

export const pageQuery = graphql`
  query PageQuery {
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

export default IndexPage;
