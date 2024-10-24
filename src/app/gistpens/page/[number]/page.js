import { TinaPage } from '@tina/page';
import { getGistpenArchivePaths, getGistpenArchiveProps } from '@tina/server';

const GistpenArchive = async ({ params }) => {
  const { response, extra } = await getGistpenArchiveProps({
    page: Number(params.number),
  });
  return <TinaPage response={response} extra={extra} />;
};

/**
 * @returns {Promise<import('next').Metadata>}
 */
export const generateMetadata = async ({ params }) => {
  const { response } = await getGistpenArchiveProps({
    page: Number(params.number),
  });

  return {
    title: response.data.page.title,
    description: response.data.page.description,
  };
};

export const generateStaticParams = async () => {
  const paths = await getGistpenArchivePaths();
  return paths.map(value => value.params);
};

export default GistpenArchive;
