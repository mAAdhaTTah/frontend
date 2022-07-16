import axios from 'axios';
import { shared, server } from '@app/config';
import { endOfDay, format, parseISO, subDays } from 'date-fns';

export const strapi = axios.create({
  baseURL: shared.STRAPI_DOMAIN,
  headers: server.STRAPI_TOKEN
    ? {
        Authorization: `Bearer ${server.STRAPI_TOKEN}`,
      }
    : null,
});

export const getReadingProps = async displayDays => {
  const now = new Date();

  const days = [];

  for (let i = 0; i < displayDays; i++) {
    const targetDay = subDays(now, i);
    const response = await strapi.get('/links', {
      params: {
        read_at_lte: endOfDay(targetDay),
        read_at_gt: endOfDay(subDays(targetDay, 1)),
        _sort: 'read_at:DESC',
        _limit: -1,
      },
    });

    if (response.data.length) {
      days.push({
        day: format(targetDay, 'MMM do, yyyy'),
        links: response.data.map(link => ({
          id: `link-${link.id}`,
          title: link.title,
          url: link.url,
          readAt: format(parseISO(link.read_at), 'hh:mm a'),
        })),
      });
    }
  }

  return days;
};
