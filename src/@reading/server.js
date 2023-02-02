import axios from 'axios';
import { subDays, endOfDay, format, parseISO, addDays } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';
import { server } from '@app/config';

export const getReadingProps = async displayDays => {
  const now = new Date();

  const days = [];

  for (let i = 0; i < displayDays; i++) {
    const targetDay = subDays(now, i);
    const response = await axios.get(
      `${server.READING_API_HOST}/api/articles`,
      {
        params: {
          read_at_lte: format(addDays(endOfDay(targetDay), 1), 'yyyy-MM-dd'),
          read_at_gt: format(endOfDay(targetDay), 'yyyy-MM-dd'),
        },
      },
    );

    if (response.data.data.length) {
      days.push({
        day: format(targetDay, 'MMM do, yyyy'),
        links: response.data.data.map(link => ({
          id: `link-${link.id}`,
          title: link.title,
          url: link.url,
          readAt: formatInTimeZone(
            parseISO(link.read_at),
            'America/New_York',
            'hh:mm a',
          ),
        })),
      });
    }
  }

  return days;
};
