import { isEqual, compareDesc } from 'date-fns';

export const createSchemaCustomization = ({ actions, schema }) => {
  const { createTypes } = actions;

  const typeDefs = [
    schema.buildObjectType({
      name: 'ReadDay',
      interfaces: ['Node'],
      extensions: {
        infer: true,
      },
      fields: {
        day: {
          type: 'Date!',
          extensions: {
            dateformat: {},
          },
        },
        links: {
          type: '[ReadLink]',
          resolve(source, args, context, info) {
            return context.nodeModel
              .getAllNodes({ type: 'ReadLink' })
              .filter(link => isEqual(link.dayOf, source.day))
              .sort((a, b) => compareDesc(a.readAt, b.readAt));
          },
        },
      },
    }),
    `type ReadLink implements Node {
      url: String!
      title: String!
      excerpt: String!
      readAt: Date! @dateformat
      dayOf: Date! @dateformat
    }`,
    `type wordpress__POST implements Node {
      yoast_json_ld: [String]
      yoast_meta: [YoastMeta]
    }`,
    `type wordpress__PAGE implements Node {
      yoast_json_ld: [String]
      yoast_meta: [YoastMeta]
    }`,
    `type wordpress__CATEGORY implements Node {
      yoast_json_ld: [String]
      yoast_meta: [YoastMeta]
    }`,
    `type wordpress__TAG implements Node {
      yoast_json_ld: [String]
      yoast_meta: [YoastMeta]
    }`,
    `type wordpress__wp_media implements Node {
      yoast_json_ld: [String]
      yoast_meta: [YoastMeta]
    }`,
    `type YoastMeta {
      name: String
      property: String
      content: String!
    }`,
  ];

  createTypes(typeDefs);
};
