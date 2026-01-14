import { Layout } from './Layout';
import { getLayoutProps } from '@vault/server';

/** @type {import('react').FC<{children: import('react').ReactNode}>} */
export const ServerLayout = async ({ children }) => {
  'use cache';
  const layout = await getLayoutProps();
  return <Layout {...layout}>{children}</Layout>;
};
