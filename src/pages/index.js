import React from 'react';
import { graphql } from 'gatsby';
import { format, startOfWeek, compareDesc } from 'date-fns';
import { Layout, Week } from '../components';

const timestampToDate = value => new Date(+value * 1000);

const getWeekOf = readAt => format(startOfWeek(new Date(readAt)), 'X');

const mergeSources = ({ allPocketArticle, allWordpressPfPfPosted }) =>
  allPocketArticle.group
    .map(({ weekOf, edges }) => {
      const wpArticles = allWordpressPfPfPosted.edges
        .filter(({ node }) => getWeekOf(node.readAt) === weekOf)
        .map(({ node }) => ({ node: { ...node } }));

      return { weekOf, edges: [...edges, ...wpArticles].sort(compareDesc) };
    })
    .sort((a, b) =>
      compareDesc(timestampToDate(a.weekOf), timestampToDate(b.weekOf))
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
    {mergeSources(data).map(({ weekOf, edges }) => (
      <Week
        key={weekOf}
        weekOf={format(timestampToDate(weekOf), 'MMM Do, YYYY')}
        links={edges.map(nodeToLink)}
      />
    ))}
  </Layout>
);

export const pageQuery = graphql`
  query PageQuery {
    allWordpressPfPfPosted(limit: 50) {
      edges {
        node {
          id
          url: item_link
          title: post_title
          excerpt: stripped_post_content
          readAt: post_date
        }
      }
    }
    allPocketArticle(sort: { fields: [time_read], order: DESC }) {
      group(field: readWeek) {
        weekOf: fieldValue
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
