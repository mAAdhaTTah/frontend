import 'server-only';
import { subDays, endOfDay, format, parseISO, addDays } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';
import { Suspense } from 'react';
import { cacheLife } from 'next/cache';
import { server } from '@app/config';
import { Day } from '@ui/components';

const ReadingDay = async ({ day }) => {
  'use cache';
  cacheLife('max');
  const url = new URL(`${server.READING_API_HOST}/api/articles`);
  url.searchParams.set(
    'read_at_lte',
    format(addDays(endOfDay(day), 1), 'yyyy-MM-dd'),
  );
  url.searchParams.set('read_at_gt', format(endOfDay(day), 'yyyy-MM-dd'));

  const resp = await fetch(url);
  const body = await resp.json();

  return body.data.length ? (
    <Day
      day={format(day, 'MMM do, yyyy')}
      links={body.data.map(link => ({
        id: `link-${link.id}`,
        title: link.title,
        url: link.url,
        readAt: formatInTimeZone(
          parseISO(link.read_at),
          'America/New_York',
          'hh:mm a',
        ),
      }))}
    />
  ) : null;
};

/** @type {import('react').FC<{ days: number; }>} */
export const ReadingList = async ({ days }) => {
  const now = new Date();

  /** @type {Date[]} */
  const dates = [];

  for (let i = 0; i < days; i++) {
    dates.push(subDays(now, i));
  }

  return (
    <>
      {dates.map(day => (
        <Suspense
          fallback={<Day day={format(day, 'MMM do, yyyy')} links={[]} />}
        >
          <ReadingDay day={day} />
        </Suspense>
      ))}
    </>
  );
};
