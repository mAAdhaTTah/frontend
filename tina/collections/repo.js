import { descriptionField, statusField, updatedAtField } from '../fields';

const blobsField = {
  type: 'object',
  name: 'blobs',
  label: 'Blobs',
  list: true,
  fields: [
    {
      type: 'string',
      name: 'filename',
      label: 'Filename',
    },
    {
      type: 'string',
      name: 'code',
      label: 'Code',
      ui: {
        component: 'textarea',
      },
    },
    {
      type: 'string',
      name: 'language',
      label: 'Language',
      options: [
        {
          label: 'Bash',
          value: 'bash',
        },
        {
          label: 'CSS',
          value: 'css',
        },
        {
          label: 'Git',
          value: 'git',
        },
        {
          label: 'Handlebars',
          value: 'handlebars',
        },
        {
          label: 'HTML',
          value: 'html',
        },
        {
          label: 'INI',
          value: 'ini',
        },
        {
          label: 'JavaScript',
          value: 'js',
        },
        {
          label: 'JavaScript React',
          value: 'jsx',
        },
        {
          label: 'PHP',
          value: 'php',
        },
        {
          label: 'PlainText',
          value: 'plaintext',
        },
        {
          label: 'Python',
          value: 'py',
        },
        {
          label: 'Ruby',
          value: 'ruby',
        },
        {
          label: 'SASS',
          value: 'sass',
        },
        {
          label: 'TypeScript',
          value: 'typescript',
        },
      ],
    },
  ],
};

/**
 * @type import('tinacms').Collection
 */
export const repoCollection = {
  name: 'repo',
  label: 'Gistpen Repos',
  path: 'content/repos',
  fields: [
    { ...descriptionField, required: true, isTitle: true },
    statusField,
    {
      type: 'string',
      name: 'gistId',
      label: 'Gist id',
    },
    {
      type: 'boolean',
      name: 'sync',
      label: 'Sync to Gist?',
    },
    {
      name: 'createdAt',
      label: 'Created At',
      type: 'datetime',
    },
    updatedAtField,
    blobsField,
    {
      type: 'object',
      name: 'commits',
      label: 'Commits',
      list: true,
      fields: [
        {
          name: 'committedAt',
          label: 'Commited At',
          type: 'datetime',
        },
        descriptionField,
        blobsField,
      ],
    },
  ],
};
