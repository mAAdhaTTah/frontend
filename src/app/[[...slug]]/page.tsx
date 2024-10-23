import { TinaPage } from '@tina/page';
import { getPagePaths, getPageProps } from '@tina/server';

type PageProps = {
  params: {
    slug: string[];
  };
};

const RootPage = async ({ params }: PageProps) => {
  // @ts-expect-error TS(2339) FIXME: Property 'extra' does not exist on type '{ respons... Remove this comment to see the full error message
  const { response, extra } = await getPageProps(params);
  return <TinaPage response={response} extra={extra} />;
};

export const generateMetadata = async ({
  params,
}: PageProps): Promise<import('next').Metadata> => {
  const { response } = await getPageProps(params);

  return {
    title: response.data.page.title,
    description: response.data.page.description,
  };
};

export const generateStaticParams = async () => {
  const paths = await getPagePaths();
  return paths.map(value => value.params);
};

export default RootPage;
