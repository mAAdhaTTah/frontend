import { format, parseISO } from 'date-fns';
import {
  dateField,
  endDateField,
  highlightsField,
  keywordsField,
  nameField,
  scoreField,
  startDateField,
  summaryField,
  urlField,
  descriptionField,
} from '../fields';

/**
 * @typedef {import('tinacms').SchemaField} Field
 */

/**
 * @type Field
 */
const basicsField = {
  type: 'object',
  name: 'basics',
  label: 'Basics',
  fields: [
    nameField,
    {
      type: 'string',
      label: 'Label',
      name: 'label',
    },
    {
      type: 'image',
      label: 'Image',
      name: 'image',
    },
    {
      type: 'string',
      label: 'Email',
      name: 'email',
    },
    {
      type: 'string',
      label: 'Phone',
      name: 'phone',
    },
    urlField,
    summaryField,
    {
      type: 'object',
      label: 'Location',
      name: 'location',
      fields: [
        {
          type: 'string',
          label: 'Address',
          name: 'address',
        },
        {
          type: 'string',
          label: 'Postal Code',
          name: 'postalCode',
        },
        {
          type: 'string',
          label: 'City',
          name: 'city',
        },
        {
          type: 'string',
          label: 'Country Code',
          name: 'countryCode',
        },
        {
          type: 'string',
          label: 'Region',
          name: 'region',
        },
      ],
    },
    {
      type: 'object',
      name: 'profiles',
      label: 'Profiles',
      list: true,
      fields: [
        {
          type: 'string',
          name: 'network',
          label: 'Network',
          isTitle: true,
          required: true,
        },
        {
          type: 'string',
          name: 'username',
          label: 'Username',
        },
        urlField,
      ],
    },
  ],
};

const formatDate = startDate => format(parseISO(startDate), 'MMM, yyyy');

const displayDateRange = item => {
  if (!item.startDate) {
    return '';
  }
  const { startDate, endDate } = item;
  let s = ` (${formatDate(startDate)}`;
  if (endDate) {
    s += ` - ${formatDate(endDate)}`;
  } else {
    s += ` - Present`;
  }
  s += ')';
  return s;
};

/**
 * @type Field
 */
const workField = {
  type: 'object',
  name: 'work',
  label: 'Work',
  list: true,
  ui: {
    itemProps: item => ({
      label: item
        ? `${item.name ?? 'New Work Item'}${displayDateRange(item)}`
        : 'New Work Item',
    }),
  },
  fields: [
    nameField,
    {
      type: 'string',
      name: 'position',
      label: 'Position',
    },
    urlField,
    startDateField,
    endDateField,
    {
      type: 'string',
      name: 'summary',
      label: 'Summary',
    },
    highlightsField,
  ],
};

/**
 * @type Field
 */
const volunteerField = {
  type: 'object',
  name: 'volunteer',
  label: 'Volunteer',
  list: true,
  fields: [
    {
      type: 'string',
      name: 'organization',
      label: 'Organization',
      required: true,
      isTitle: true,
    },
    {
      type: 'string',
      name: 'position',
      label: 'Position',
    },
    {
      type: 'string',
      name: 'url',
      label: 'URL',
    },
    startDateField,
    endDateField,
    summaryField,
    {
      type: 'string',
      name: 'highlights',
      label: 'Highlights',
      list: true,
    },
  ],
};

/**
 * @type Field
 */
const educationField = {
  type: 'object',
  name: 'education',
  label: 'Education',
  list: true,
  fields: [
    {
      type: 'string',
      name: 'institution',
      label: 'Institution',
    },
    urlField,
    {
      type: 'string',
      name: 'area',
      label: 'Area',
    },
    {
      type: 'string',
      name: 'studyType',
      label: 'Study Type',
    },
    startDateField,
    endDateField,
    scoreField,
    {
      type: 'string',
      name: 'courses',
      label: 'Courses',
      list: true,
    },
  ],
};

/**
 * @type Field
 */
const awardsField = {
  type: 'object',
  name: 'awards',
  label: 'Awards',
  list: true,
  fields: [
    {
      type: 'string',
      name: 'title',
      label: 'Title',
    },
    dateField,
    {
      type: 'string',
      name: 'awarder',
      label: 'Awarder',
    },
    {
      type: 'string',
      name: 'summary',
      label: 'Summary',
    },
  ],
};

/**
 * @type Field
 */
const certificatesField = {
  type: 'object',
  name: 'certificates',
  label: 'Certificates',
  list: true,
  fields: [
    nameField,
    dateField,
    {
      type: 'string',
      name: 'issuer',
      label: 'Issuer',
    },
    urlField,
  ],
};

/**
 * @type Field
 */
const publicationsField = {
  type: 'object',
  name: 'publications',
  label: 'Publications',
  list: true,
  fields: [
    nameField,
    {
      type: 'string',
      name: 'publisher',
      label: 'Publisher',
    },
    {
      type: 'datetime',
      name: 'releaseDate',
      label: 'Release Date',
      // timeFormat: '',
    },
    urlField,
    summaryField,
  ],
};

/**
 * @type Field
 */
const skillsField = {
  type: 'object',
  name: 'skills',
  label: 'Skills',
  list: true,
  fields: [
    nameField,
    {
      type: 'string',
      name: 'level',
      label: 'Level',
    },
    keywordsField,
  ],
};

/**
 * @type Field
 */
const languagesField = {
  type: 'object',
  name: 'languages',
  label: 'Languages',
  list: true,
  fields: [
    {
      type: 'string',
      name: 'language',
      label: 'Language',
    },
    {
      type: 'string',
      name: 'fluency',
      label: 'Fluency',
    },
  ],
};

/**
 * @type Field
 */
const interestsField = {
  type: 'object',
  name: 'interests',
  label: 'Interests',
  list: true,
  fields: [nameField, keywordsField],
};

/**
 * @type Field
 */
const referencesField = {
  type: 'object',
  name: 'references',
  label: 'References',
  list: true,
  fields: [
    nameField,
    {
      type: 'string',
      name: 'reference',
      label: 'Reference',
    },
  ],
};

/**
 * @type Field
 */
const projectsField = {
  type: 'object',
  name: 'projects',
  label: 'Projects',
  list: true,
  fields: [
    nameField,
    descriptionField,
    highlightsField,
    keywordsField,
    startDateField,
    endDateField,
    urlField,
    {
      type: 'string',
      name: 'roles',
      label: 'Roles',
      list: true,
    },
    {
      type: 'string',
      name: 'entity',
      label: 'Entity',
    },
    {
      type: 'string',
      name: 'type',
      label: 'Type',
    },
  ],
};

/**
 * @type import('tinacms').Collection
 */
export const resumeCollection = {
  label: 'Resumes',
  name: 'resume',
  path: 'content/resumes',
  fields: [
    basicsField,
    workField,
    volunteerField,
    educationField,
    awardsField,
    certificatesField,
    publicationsField,
    skillsField,
    languagesField,
    interestsField,
    referencesField,
    projectsField,
  ],
};
