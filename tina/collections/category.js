import { descriptionField, nameField } from '../fields';

/**
 * @typedef {import('tinacms').Collection} TinaCollection
 */

/**
 * @type TinaCollection
 */
export const categoryCollection = {
  name: 'category',
  label: 'Category',
  path: 'content/categories',
  fields: [
    nameField,
    {
      type: 'reference',
      name: 'parent',
      label: 'Parent',
      collections: ['category'],
    },
    { ...descriptionField, isBody: true },
  ],
};
