import { descriptionField, nameField } from '../fields';

/**
 * @type import('tinacms').Collection
 */
export const tagCollection = {
  name: 'tag',
  label: 'Tags',
  path: 'content/tags',
  fields: [nameField, { ...descriptionField, isBody: true }],
};
