import axios from 'axios';
import { server } from '@app/config';

export const strapi = axios.create({
  baseURL: server.STRAPI_DOMAIN,
  headers: {
    Authorization: `Bearer ${server.STRAPI_TOKEN}`,
  },
});

export const HOME_SLUG = '__index__';

export const resolveSegments = page =>
  page.slug === HOME_SLUG ? [] : page.slug.split('/');

export const FIVE_HUNDRED_SLUG = '__500__';
export const FOUR_OH_FOUR_SLUG = '__404__';
export const IGNORE_SLUGS = [FIVE_HUNDRED_SLUG, FOUR_OH_FOUR_SLUG];
