import { Layout } from './Layout';
import { getLayoutProps } from '@vault/server';

/** @type {import('react').FC<{children: import('react').ReactNode}>} */
export const ServerLayout = async ({ children }) => {
  const layout = getLayoutProps();
  return <Layout layoutP={layout}>{children}</Layout>;
};
