export const HOME_SLUG = '__index__';

export const resolveSegments = slug =>
  slug === HOME_SLUG ? [] : slug.split('/');

export const resolveSlug = ({ slug }) =>
  slug == null ? HOME_SLUG : Array.isArray(slug) ? slug.join('/') : slug;

export const FIVE_HUNDRED_SLUG = '__500__';
export const FOUR_OH_FOUR_SLUG = '__404__';
export const IGNORED_SLUGS = [FOUR_OH_FOUR_SLUG, FIVE_HUNDRED_SLUG];
