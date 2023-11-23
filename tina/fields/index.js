/**
 * @typedef {import('tinacms').TinaField} TinaField
 */

/**
 * @type TinaField
 */
export const nameField = {
  type: 'string',
  name: 'name',
  label: 'Name',
  required: true,
  isTitle: true,
};

/**
 * @type TinaField
 */
export const startDateField = {
  type: 'datetime',
  name: 'startDate',
  label: 'Start Date',
  // dateFormat: 'yyyy-MM-DD',
  // timeFormat: '',
  required: true,
};

/**
 * @type TinaField
 */
export const endDateField = {
  type: 'datetime',
  name: 'endDate',
  label: 'End Date',
  // timeFormat: '',
};

/**
 * @type TinaField
 */
export const dateField = {
  type: 'datetime',
  name: 'date',
  label: 'Date',
  // timeFormat: '',
};

/**
 * @type TinaField
 */
export const scoreField = {
  type: 'number',
  name: 'score',
  label: 'Score',
};

/**
 * @type TinaField
 */
export const urlField = {
  type: 'string',
  name: 'url',
  label: 'URL',
};

/**
 * @type TinaField
 */
export const summaryField = {
  type: 'string',
  label: 'Summary',
  name: 'summary',
};

/**
 * @type TinaField
 */
export const keywordsField = {
  type: 'string',
  name: 'keywords',
  label: 'Keywords',
  list: true,
};

/**
 * @type TinaField
 */
export const highlightsField = {
  type: 'string',
  name: 'highlights',
  label: 'Highlights',
  list: true,
};

/**
 * @type TinaField
 */
export const statusField = {
  type: 'string',
  name: 'status',
  label: 'Status',
  options: [
    {
      label: 'Publish',
      value: 'publish',
    },
    {
      label: 'Draft',
      value: 'draft',
    },
  ],
};

/**
 * @type TinaField
 */
export const updatedAtField = {
  name: 'updatedAt',
  label: 'Updated At',
  type: 'datetime',
};

/**
 * @type TinaField
 */
export const descriptionField = {
  type: 'string',
  name: 'description',
  label: 'Description',
};

/**
 * @type TinaField
 */
export const titleField = {
  type: 'string',
  name: 'title',
  label: 'Title',
  required: true,
  isTitle: true,
};

/**
 * @type TinaField
 */
export const publishedAtField = {
  name: 'publishedAt',
  label: 'Published At',
  type: 'datetime',
};

/**
 * @type TinaField
 */
export const menuField = {
  type: 'reference',
  name: 'menu',
  label: 'Menu',
  collections: ['menu'],
  required: true,
};

/**
 * @type TinaField
 */
export const headerField = {
  type: 'reference',
  name: 'header',
  label: 'Header',
  collections: ['header'],
  required: true,
};
