import React from 'react';
import { graphql } from 'gatsby';
import { format, startOfDay, compareDesc } from 'date-fns';
import { Layout, Day } from '../components';

const timestampToDate = value => new Date(+value * 1000);

const getDayOf = readAt => format(startOfDay(new Date(readAt)), 'X');

const mergeSources = ({ allPocketArticle, allWordpressPfPfPosted }) =>
  allPocketArticle.group
    .map(({ dayOf, edges }) => {
      const wpArticles = allWordpressPfPfPosted.edges
        .filter(({ node }) => getDayOf(node.readAt) === dayOf)
        .map(({ node }) => ({ node: { ...node } }));

      return { dayOf, edges: [...edges, ...wpArticles].sort(compareDesc) };
    })
    .sort((a, b) =>
      compareDesc(timestampToDate(a.dayOf), timestampToDate(b.dayOf))
    );

const nodeToLink = ({ node }) => ({
  id: node.id,
  url: node.url,
  title: node.title,
  excerpt: (node.excerpt || '').trim(),
  readAt: format(
    typeof node.readAt === 'number'
      ? timestampToDate(node.readAt)
      : node.readAt,
    'hh:mm a, MMM Do'
  ),
});

const IndexPage = ({ data }) => (
  <Layout>
    {mergeSources(data).map(({ dayOf, edges }) => (
      <Day
        key={dayOf}
        dayOf={format(timestampToDate(dayOf), 'MMM Do, YYYY')}
        links={edges.map(nodeToLink)}
      />
    ))}
  </Layout>
);

export const pageQuery = graphql`
  query PageQuery {
    allWordpressPfPfPosted {
      edges {
        node {
          id
          url: guid
          title: post_title
          excerpt: stripped_post_content
          readAt: post_date
        }
      }
    }
    allPocketArticle(sort: { fields: [time_read], order: DESC }) {
      group(field: readDay) {
        dayOf: fieldValue
        edges {
          node {
            id
            url
            title
            excerpt
            readAt: time_read
          }
        }
      }
    }
  }
`;

export default IndexPage;
