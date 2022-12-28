import { descriptionField, nameField } from '../fields';

/**
 * @typedef {import('tinacms').Collection} TinaCollection
 */

/**
 * @type TinaCollection
 */
export const commentCollection = {
  name: 'comment',
  label: 'Comments',
  path: 'content/comments',
  fields: [nameField, { ...descriptionField, isBody: true }],
};
