import axios from 'axios';
import { shared, server } from '../config';

export const wp = axios.create();

wp.interceptors.request.use(value => {
  if (value.url.includes(shared.WP_API_DOMAIN)) {
    value.headers['Authorization'] = `Basic ${Buffer.from(
      `${server.WP_API_USERNAME}:${server.WP_API_PASSWORD}`,
      'binary',
    ).toString('base64')}`;
  }

  return value;
});
