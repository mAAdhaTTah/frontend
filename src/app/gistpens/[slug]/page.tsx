import { TinaPage } from '@tina/page';
import { getGistpenPaths, getGistpenSingleProps } from '@tina/server';

type PageProps = {
  params: {
    slug: string;
  };
};

const GistpenSingle = async ({ params }: PageProps) => {
  const { response, extra } = await getGistpenSingleProps(params.slug);
  return <TinaPage response={response} extra={extra} />;
};

/**
 * @returns {Promise<import('next').Metadata>}
 */
export const generateMetadata = async ({ params }: PageProps) => {
  const { response } = await getGistpenSingleProps(params.slug);

  return {
    title: response.data.page.title,
    description: response.data.page.description,
  };
};

export const generateStaticParams = async () => {
  const paths = await getGistpenPaths();
  return paths.map(value => value.params);
};

export default GistpenSingle;
