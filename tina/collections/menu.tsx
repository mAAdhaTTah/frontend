import { nameField } from '../fields';

/**
 * @typedef {import('tinacms').Template} Template
 * @typedef {import('tinacms').TinaField} Field
 * @typedef {import('tinacms').Collection} Collection
 */

/**
 * @type Template
 */
const internalLinkTemplate = {
  name: 'internalLink',
  label: 'Internal Link',
  fields: [
    {
      type: 'string',
      name: 'text',
      label: 'Text',
      required: true,
    },
    {
      type: 'reference',
      name: 'target',
      label: 'Target',
      collections: ['page'],
    },
  ],
};

/**
 * @type Template
 */
const externalLinkTemplate = {
  name: 'externalLink',
  label: 'External Link',
  fields: [
    {
      type: 'string',
      name: 'text',
      label: 'Text',
      required: true,
    },
    {
      type: 'string',
      name: 'href',
      label: 'href',
    },
  ],
};

/**
 * @type Field
 */
const itemsField = {
  name: 'items',
  type: 'object',
  label: 'Menu Items',
  list: true,
  templates: [internalLinkTemplate, externalLinkTemplate],
};

/**
 * @type Collection
 */
export const menuCollection = {
  label: 'Menus',
  name: 'menu',
  path: 'content/menus',
  fields: [nameField, itemsField],
};
