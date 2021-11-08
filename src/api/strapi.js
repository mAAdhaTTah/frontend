import axios from 'axios';
import { server } from '../config';

export const strapi = axios.create({
  baseURL: server.STRAPI_DOMAIN,
  headers: {
    Authorization: `Bearer ${server.STRAPI_TOKEN}`,
  },
});
