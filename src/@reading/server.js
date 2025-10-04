import 'server-only';
import axios from 'axios';
import { subDays, endOfDay, format, parseISO, addDays } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';
import { server } from '@app/config';
import { Day } from '@ui/components';

/**
 * @typedef {Object} Link
 * @property {string} id
 *
 * @typedef {Object} Day
 * @property {string} day
 * @property {Link[]} links
 */

/**
 *
 * @param {number} displayDays
 * @returns Promise<Day[]>
 */
export const getReadingProps = async displayDays => {
  const now = new Date();

  /** @type {Day[]} */
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

/** @type {import('react').FC<{ days: number; }>} */
export const ReadingList = async ({ days }) => {
  const reading = await getReadingProps(days);
  return (
    <>
      {reading.map(({ day, links }) => (
        <Day key={day} day={day} links={links} />
      ))}
    </>
  );
};
