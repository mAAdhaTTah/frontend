type Field = import('tinacms').TinaField;

export const nameField: Field = {
  type: 'string',
  name: 'name',
  label: 'Name',
  required: true,
  isTitle: true,
};

export const startDateField: Field = {
  type: 'datetime',
  name: 'startDate',
  label: 'Start Date',
  // dateFormat: 'yyyy-MM-DD',
  // timeFormat: '',
  required: true,
};

export const endDateField: Field = {
  type: 'datetime',
  name: 'endDate',
  label: 'End Date',
  // timeFormat: '',
};

export const dateField: Field = {
  type: 'datetime',
  name: 'date',
  label: 'Date',
  // timeFormat: '',
};

export const scoreField: Field = {
  type: 'number',
  name: 'score',
  label: 'Score',
};

export const urlField: Field = {
  type: 'string',
  name: 'url',
  label: 'URL',
};

export const summaryField: Field = {
  type: 'string',
  label: 'Summary',
  name: 'summary',
};

export const keywordsField: Field = {
  type: 'string',
  name: 'keywords',
  label: 'Keywords',
  list: true,
};

export const highlightsField: Field = {
  type: 'string',
  name: 'highlights',
  label: 'Highlights',
  list: true,
};

export const statusField: Field = {
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

export const updatedAtField: Field = {
  name: 'updatedAt',
  label: 'Updated At',
  type: 'datetime',
};

export const descriptionField: Field = {
  type: 'string',
  name: 'description',
  label: 'Description',
};

export const titleField: Field = {
  type: 'string',
  name: 'title',
  label: 'Title',
  required: true,
  isTitle: true,
};

export const publishedAtField: Field = {
  name: 'publishedAt',
  label: 'Published At',
  type: 'datetime',
};

export const menuField: Field = {
  type: 'reference',
  name: 'menu',
  label: 'Menu',
  collections: ['menu'],
  required: true,
};

export const headerField: Field = {
  type: 'reference',
  name: 'header',
  label: 'Header',
  collections: ['header'],
  required: true,
};
