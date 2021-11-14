import axios from 'axios';
import { server } from '@app/config';

export const strapi = axios.create({
  baseURL: server.STRAPI_DOMAIN,
  headers: {
    Authorization: `Bearer ${server.STRAPI_TOKEN}`,
  },
});
