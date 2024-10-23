import { titleField } from '../fields';

/**
 * @typedef {import('tinacms').Collection} TinaCollection
 */

/**
 * @type TinaCollection
 */
export const mediaCollection = {
  name: 'media',
  label: 'Media',
  path: 'content/media',
  fields: [
    titleField,
    {
      type: 'image',
      name: 'source',
      label: 'Source',
    },
    {
      type: 'string',
      name: 'altText',
      label: 'Alt text',
      ui: {
        component: 'textarea',
      },
    },
    {
      type: 'string',
      name: 'caption',
      label: 'Caption',
      ui: {
        component: 'textarea',
      },
    },
  ],
};
