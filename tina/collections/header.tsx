import { descriptionField } from '../fields';

/**
 * @typedef {import('tinacms').Collection} TinaCollection
 */

/**
 * @type TinaCollection
 */
export const headerCollection = {
  name: 'header',
  label: 'Headers',
  path: 'content/headers',
  fields: [
    {
      type: 'string',
      name: 'title',
      label: 'Title',
    },
    descriptionField,
    {
      type: 'reference',
      name: 'background',
      label: 'Background',
      collections: ['media'],
    },
    {
      type: 'reference',
      name: 'avatar',
      label: 'Avatar',
      collections: ['media'],
    },
  ],
};
