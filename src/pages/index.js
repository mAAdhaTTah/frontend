import React from 'react';
import { graphql } from 'gatsby';
import { format } from 'date-fns';
import { Layout, Week } from '../components';

const timestampToDate = value => new Date(+value * 1000);

const IndexPage = ({ data }) => (
  <Layout>
    {data.allPocketArticle.group.map(({ fieldValue, edges }) => (
      <Week
        key={fieldValue}
        weekOf={format(timestampToDate(fieldValue), 'MMM Do, YYYY')}
        links={edges.map(({ node }) => ({
          id: node.id,
          url: node.url,
          title: node.title,
          excerpt: node.excerpt,
          readAt: format(timestampToDate(node.time_read), 'hh:mm a, MMM Do'),
        }))}
      />
    ))}
  </Layout>
);

export const pageQuery = graphql`
  query PageQuery {
    allPocketArticle(sort: { fields: [time_read], order: DESC }) {
      group(field: readWeek) {
        fieldValue
        edges {
          node {
            id
            url
            title
            excerpt
            time_read
          }
        }
      }
    }
  }
`;

export default IndexPage;
