import { descriptionField, nameField } from '../fields';

/**
 * @typedef {import('tinacms').Collection} TinaCollection
 * @typedef {import('tinacms').SchemaField} Field
 */

/** @type {Field} */
const authorField = {
  type: 'object',
  name: 'author',
  label: 'Author',
  fields: [
    {
      name: 'name',
      label: 'Name',
      type: 'string',
    },
    {
      name: 'url',
      label: 'URL',
      type: 'string',
    },
  ],
};

/**
 * @type TinaCollection
 */
export const commentCollection = {
  name: 'comment',
  label: 'Comments',
  path: 'content/comments',
  fields: [
    authorField,
    {
      type: 'rich-text',
      name: 'body',
      label: 'Body',
    },
    {
      type: 'reference',
      name: 'post',
      label: 'Post',
      collections: ['post'],
    },
    {
      type: 'reference',
      name: 'parent',
      label: 'Parent',
      collections: ['comment'],
    },
  ],
};
