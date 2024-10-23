export const HOME_SLUG = '__index__';

/**
 * @param {string} slug
 * @returns string[]
 */
export const resolveSegments = (slug: any) =>
  slug === HOME_SLUG ? [] : slug.split('/');

export const resolveSlug = ({ slug }: any) =>
  slug == null ? HOME_SLUG : Array.isArray(slug) ? slug.join('/') : slug;

export const FIVE_HUNDRED_SLUG = '__500__';
export const FOUR_OH_FOUR_SLUG = '__404__';
export const IGNORED_SLUGS = [FOUR_OH_FOUR_SLUG, FIVE_HUNDRED_SLUG];

export const SINGLE_SLUG = '__single__';
export const ARCHIVE_SLUG = '__archive__';
