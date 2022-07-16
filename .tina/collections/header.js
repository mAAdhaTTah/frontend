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
      type: 'image',
      name: 'background',
      label: 'Background',
    },
    {
      type: 'image',
      name: 'avatar',
      label: 'Avatar',
    },
  ],
};
