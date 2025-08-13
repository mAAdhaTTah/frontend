import { getLayoutProps } from '@vault/server';
import { Layout } from './Layout';

/** @type {import('react').FC<{children: import('react').ReactNode}>} */
export const ServerLayout = async ({ children }) => {
  const layout = await getLayoutProps();
  return <Layout {...layout}>{children}</Layout>;
};
