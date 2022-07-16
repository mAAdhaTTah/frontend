import {
  titleField,
  statusField,
  updatedAtField,
  publishedAtField,
  menuField,
  headerField,
} from '../fields';

/**
 * @typedef {import('tinacms').Template} Template
 */

/**
 * @type {import('tinacms').SchemaField}
 */
const perPageField = {
  type: 'number',
  name: 'perPage',
  label: 'Posts per page',
};

/**
 * @type Template
 */
const contentBlockTemplate = {
  name: 'richText',
  label: 'Rich Text',
  fields: [
    {
      type: 'string',
      name: 'wrapper',
      label: 'Element wrapper',
      options: [
        {
          label: 'No wrapper',
          value: 'none',
        },
        {
          label: 'Article',
          value: 'article',
        },
      ],
    },
    {
      type: 'rich-text',
      label: 'Content',
      name: 'content',
    },
  ],
};

/**
 * @type Template
 */
const resumeEmbedTemplate = {
  name: 'resumeEmbed',
  label: 'Resume Embed',
  fields: [
    {
      type: 'reference',
      name: 'resume',
      collections: ['resume'],
    },
  ],
};

/**
 * @type Template
 */
const fullScreenTemplate = {
  name: 'fullScreen',
  label: 'Full Screen Template',
  fields: [
    titleField,
    publishedAtField,
    updatedAtField,
    menuField,
    headerField,
    statusField,
  ],
};

/**
 * @type Template
 */
const gistpenArchiveTemplate = {
  name: 'gistpenArchive',
  label: 'Gistpen Archive Template',
  fields: [
    titleField,
    publishedAtField,
    updatedAtField,
    menuField,
    headerField,
    statusField,
    perPageField,
  ],
};

/**
 * @type Template
 */
const gistpenSingleTemplate = {
  name: 'gistpenSingle',
  label: 'Gistpen Single Template',
  fields: [
    titleField,
    publishedAtField,
    updatedAtField,
    menuField,
    headerField,
    statusField,
  ],
};

/**
 * @type Template
 */
const landingTemplate = {
  name: 'landing',
  label: 'Landing Template',
  fields: [
    titleField,
    publishedAtField,
    updatedAtField,
    menuField,
    headerField,
    statusField,
    {
      type: 'object',
      name: 'body',
      label: 'Body',
      list: true,
      templates: [contentBlockTemplate, resumeEmbedTemplate],
    },
  ],
};

/**
 * @type Template
 */
const postArchiveTemplate = {
  name: 'postArchive',
  label: 'Post Archive Template',
  fields: [
    titleField,
    publishedAtField,
    updatedAtField,
    menuField,
    headerField,
    statusField,
    perPageField,
  ],
};

/**
 * @type Template
 */
const postSingleTemplate = {
  name: 'postSingle',
  label: 'Post Single Template',
  fields: [
    titleField,
    publishedAtField,
    updatedAtField,
    menuField,
    headerField,
  ],
};

/**
 * @type Template
 */
const readingListTemplate = {
  name: 'readingList',
  label: 'Reading List Template',
  fields: [
    titleField,
    publishedAtField,
    updatedAtField,
    menuField,
    headerField,
    statusField,
    {
      type: 'number',
      name: 'days',
      label: 'Days to display',
    },
  ],
};

/**
 * @type {import('tinacms').Collection}
 */
export const pageCollection = {
  name: 'page',
  label: 'Pages',
  path: 'content/pages',
  templates: [
    fullScreenTemplate,
    gistpenArchiveTemplate,
    gistpenSingleTemplate,
    landingTemplate,
    readingListTemplate,
    postArchiveTemplate,
    postSingleTemplate,
  ],
};
