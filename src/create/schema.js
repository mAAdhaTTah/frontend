const { isEqual, compareDesc } = require('date-fns');

exports.createSchemaCustomization = ({ actions, schema }) => {
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
  ];

  createTypes(typeDefs);
};
