import '../index.css';
import { ViewTransitions } from 'next-view-transitions';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import cc from 'classcat';
import { Mulish, Ovo, Montserrat } from 'next/font/google';
import { ServerLayout } from '@ui/layout';

/**
 * @typedef {import('next').Metadata} Metadata
 */

/** @type {Metadata} */
export const metadata = {
  title: {
    default: 'James DiGioia',
    template: '%s | James DiGioia',
  },
  description: 'my little web home',
  alternates: {
    types: {
      'application/rss+xml': 'https://jamesdigioia.com/feed/',
      'application/feed+json': 'https://jamesdigioia.com/feed/json/',
      'application/atom+xml': 'https://jamesdigioia.com/feed/atom/',
    },
  },
};

const mulish = Mulish({
  display: 'swap',
  variable: '--font-mulish',
  weight: ['400', '700'],
  subsets: ['latin'],
});

const ovo = Ovo({
  display: 'swap',
  weight: ['400'],
  variable: '--font-ovo',
  subsets: ['latin'],
});

const montserrat = Montserrat({
  display: 'swap',
  variable: '--font-montserrat',
  subsets: ['latin'],
});

const RootLayout = async ({ children }) => {
  return (
    <ViewTransitions>
      <html lang="en">
        <head></head>
        <body
          className={cc([mulish.variable, ovo.variable, montserrat.variable])}
        >
          <ServerLayout>{children}</ServerLayout>
          <Analytics />
          <SpeedInsights />
        </body>
      </html>
    </ViewTransitions>
  );
};

export default RootLayout;
