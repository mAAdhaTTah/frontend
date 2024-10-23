import { TinaPage } from '@tina/page';
import { getPagePaths, getPageProps } from '@tina/server';

const RootPage = async ({ params }: any) => {
  // @ts-expect-error TS(2339) FIXME: Property 'extra' does not exist on type '{ respons... Remove this comment to see the full error message
  const { response, extra } = await getPageProps(params);
  return <TinaPage response={response} extra={extra} />;
};

/**
 * @returns {Promise<import('next').Metadata>}
 */
export const generateMetadata = async ({ params }: any) => {
  const { response } = await getPageProps(params);

  return {
    title: response.data.page.title,
    description: response.data.page.description,
  };
};

export const generateStaticParams = async () => {
  const paths = await getPagePaths();
  return paths.map((value: any) => value.params);
};

export default RootPage;
