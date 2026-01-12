import { getLayoutProps } from '@vault/server';
import { Layout } from './Layout';

/** @type {import('react').FC<{children: import('react').ReactNode}>} */
export const ServerLayout = async ({ children }) => {
  'use cache';
  const layout = await getLayoutProps();
  return <Layout {...layout}>{children}</Layout>;
};
