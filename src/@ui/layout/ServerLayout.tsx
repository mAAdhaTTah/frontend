import { unstable_cache as cache } from 'next/cache';
import { getLayoutProps } from '@tina/server';
import { Layout } from './Layout';

const getProps = cache(getLayoutProps);

export const ServerLayout = async ({ children }: any) => {
  const layout = await getProps();
  return <Layout {...layout}>{children}</Layout>;
};
