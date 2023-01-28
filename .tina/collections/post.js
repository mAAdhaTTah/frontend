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
 * @typedef {import('tinacms').TinaField} Field
 * @typedef {import('tinacms').RichTextType} RichTextField
 */

/**
 * @type RichTextField['template']
 */
const footnoteTemplate = {
  name: 'Footnote',
  label: 'Footnote',
  inline: true,
  fields: [
    {
      name: 'children',
      label: 'Note',
      type: 'rich-text',
    },
  ],
};

/**
 * @type RichTextField['template']
 */
const footnoteReferenceTemplate = {
  name: 'FootnoteReference',
  label: 'Footnote Reference',
  inline: true,
  fields: [
    {
      name: 'id',
      label: 'id',
      type: 'string',
      isTitle: true,
      required: true,
    },
  ],
};

/**
 * @type RichTextField['template']
 */
const footnoteDefinitionTemplate = {
  name: 'FootnoteDefinition',
  label: 'Footnote Definition',
  fields: [
    {
      name: 'id',
      label: 'id',
      type: 'string',
    },
    {
      name: 'children',
      label: 'Note',
      type: 'rich-text',
    },
  ],
};

/**
 * @type Template
 */
const nestedExtendedQuote = {
  name: 'ExtendedQuote',
  label: 'Extended Quote',
  fields: [
    {
      name: 'children',
      label: 'Quote',
      type: 'rich-text',
    },
    {
      name: 'citation',
      label: 'Citation',
      type: 'string',
    },
  ],
};

/**
 * @type Template
 */
const extendedQuoteTemplate = {
  name: 'ExtendedQuote',
  label: 'Extended Quote',
  fields: [
    {
      name: 'children',
      label: 'Quote',
      type: 'rich-text',
      templates: [
        nestedExtendedQuote,
        footnoteDefinitionTemplate,
        footnoteReferenceTemplate,
      ],
    },
    {
      name: 'citation',
      label: 'Citation',
      type: 'string',
    },
  ],
};

/**
 * @type Template
 */
const figureTemplate = {
  name: 'Figure',
  label: 'Figure',
  fields: [
    {
      name: 'url',
      label: 'URL',
      type: 'string',
    },
    {
      name: 'altText',
      label: 'Alt Text',
      type: 'string',
    },
    {
      name: 'caption',
      label: 'Caption',
      type: 'string',
    },
    {
      name: 'linkTarget',
      label: 'Link Target',
      type: 'string',
    },
  ],
};

/**
 * @type Field
 */
const featuredMediaField = {
  type: 'reference',
  name: 'featuredMedia',
  label: 'Featured Media',
  collections: ['media'],
};

/**
 * @type Template
 */
const embedTemplate = {
  name: 'Embed',
  label: 'Embed',
  fields: [
    {
      type: 'string',
      name: 'url',
      label: 'URL',
    },
    {
      type: 'string',
      name: 'provider',
      label: 'Provider',
      options: [{ label: 'Twitter', value: 'twitter' }],
    },
  ],
};

/**
 * @type Field
 */
const categoriesField = {
  type: 'object',
  name: 'categories',
  label: 'Categories',
  list: true,
  fields: [
    {
      type: 'reference',
      name: 'reference',
      label: 'Reference',
      collections: ['category'],
    },
  ],
};

/**
 * @type Field
 */
const tagsField = {
  type: 'object',
  name: 'tags',
  label: 'Tags',
  list: true,
  fields: [
    {
      type: 'reference',
      name: 'reference',
      label: 'Reference',
      collections: ['tag'],
    },
  ],
};

/**
 * @type Field
 */
const contentField = {
  type: 'rich-text',
  name: 'content',
  label: 'Content',
  templates: [
    extendedQuoteTemplate,
    figureTemplate,
    embedTemplate,
    footnoteTemplate,
    footnoteReferenceTemplate,
    footnoteDefinitionTemplate,
  ],
};

/**
 * @type Template
 */
const richTextTemplate = {
  name: 'richText',
  label: 'Rich Text',
  fields: [contentField],
};

/**
 * @type Template
 */
const gistpenEmbedTemplate = {
  name: 'gistpenEmbed',
  label: 'Gistpen Embed',
  fields: [
    {
      type: 'reference',
      name: 'repo',
      label: 'Repo',
      collections: ['repo'],
    },
    {
      type: 'string',
      name: 'blob',
      label: 'Blob',
    },
    {
      type: 'string',
      name: 'highlight',
      label: 'Highlight',
    },
    {
      type: 'number',
      name: 'offset',
      label: 'Offset',
    },
  ],
};

/**
 * @type Field
 */
const bodyField = {
  type: 'object',
  name: 'body',
  label: 'Body',
  list: true,
  templates: [
    // TODO(James) migrate them all down to single rich text field
    richTextTemplate,
    gistpenEmbedTemplate,
  ],
};

/**
 * @type Field
 */
const excerptField = {
  type: 'rich-text',
  name: 'excerpt',
  label: 'Excerpt',
  templates: [extendedQuoteTemplate],
};

/**
 * @type Field
 */
const sourceField = {
  type: 'object',
  name: 'source',
  label: 'Quote Source',
  fields: [
    {
      type: 'string',
      name: 'url',
      label: 'Quote URL',
    },
    {
      type: 'string',
      name: 'name',
      label: 'Quote Name',
    },
  ],
};

/**
 * @type Template
 */
const standardTemplate = {
  name: 'standard',
  label: 'Standard Format',
  fields: [
    titleField,
    publishedAtField,
    updatedAtField,
    menuField,
    headerField,
    statusField,
    bodyField,
    excerptField,
    featuredMediaField,
    categoriesField,
    tagsField,
  ],
};

/**
 * @type Template
 */
const statusTemplate = {
  name: 'status',
  label: 'Status Format',
  fields: [
    publishedAtField,
    updatedAtField,
    statusField,
    bodyField,
    categoriesField,
    tagsField,
  ],
};

/**
 * @type Template
 */
const audioTemplate = {
  name: 'audio',
  label: 'Audio Format',
  fields: [
    titleField,
    publishedAtField,
    updatedAtField,
    statusField,
    {
      type: 'object',
      name: 'audio',
      label: 'Audio',
      fields: [
        {
          type: 'string',
          name: 'url',
          label: 'URL',
        },
      ],
    },
    bodyField,
    categoriesField,
    tagsField,
  ],
};

/**
 * @type Template
 */
const linkTemplate = {
  name: 'link',
  label: 'Link Format',
  fields: [
    titleField,
    publishedAtField,
    updatedAtField,
    statusField,
    bodyField,
    {
      type: 'object',
      name: 'link',
      label: 'Link',
      fields: [
        {
          type: 'string',
          name: 'url',
          label: 'URL',
        },
      ],
    },
    categoriesField,
    tagsField,
  ],
};

/**
 * @type Template
 */
const quoteTemplate = {
  name: 'quote',
  label: 'Quote Format',
  fields: [
    titleField,
    publishedAtField,
    updatedAtField,
    statusField,
    bodyField,
    sourceField,
    categoriesField,
    tagsField,
  ],
};

/**
 * @type Template
 */
const videoTemplate = {
  name: 'video',
  label: 'Video Format',
  fields: [
    titleField,
    publishedAtField,
    updatedAtField,
    statusField,
    {
      type: 'object',
      name: 'video',
      label: 'Video',
      fields: [
        {
          type: 'string',
          name: 'url',
          label: 'URL',
        },
      ],
    },
    bodyField,
    categoriesField,
    tagsField,
  ],
};

/**
 * @type Template
 */
const imageTemplate = {
  name: 'image',
  label: 'Image Format',
  fields: [
    titleField,
    publishedAtField,
    updatedAtField,
    statusField,
    featuredMediaField,
    bodyField,
    categoriesField,
    tagsField,
  ],
};

/**
 * @type Template
 */
const galleryTemplate = {
  name: 'gallery',
  label: 'Gallery Format',
  fields: [
    titleField,
    publishedAtField,
    updatedAtField,
    statusField,
    bodyField,
    {
      type: 'object',
      list: true,
      name: 'images',
      label: 'Images',
      fields: [
        {
          type: 'reference',
          name: 'reference',
          label: 'Media Reference',
          collections: ['media'],
        },
      ],
    },
    categoriesField,
    tagsField,
  ],
};

/**
 * @type Template
 */
const asideTemplate = {
  name: 'aside',
  label: 'Aside Format',
  fields: [
    publishedAtField,
    updatedAtField,
    statusField,
    bodyField,
    categoriesField,
    tagsField,
  ],
};

/**
 * @type import('tinacms').TinaCollection
 */
export const postCollection = {
  name: 'post',
  label: 'Posts',
  path: 'content/posts',
  templates: [
    standardTemplate,
    statusTemplate,
    audioTemplate,
    linkTemplate,
    quoteTemplate,
    videoTemplate,
    imageTemplate,
    galleryTemplate,
    asideTemplate,
  ],
};
