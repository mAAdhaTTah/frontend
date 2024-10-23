import { TinaPage } from '@tina/page';
import { getWritingArchiveProps, getWritingArchivePaths } from '@tina/server';

const GistpenArchive = async ({ params }: any) => {
  const { response, extra } = await getWritingArchiveProps({
    page: Number(params.number),
  });
  return <TinaPage response={response} extra={extra} />;
};

/**
 * @returns {Promise<import('next').Metadata>}
 */
export const generateMetadata = async ({ params }: any) => {
  const { response } = await getWritingArchiveProps({
    page: Number(params.number),
  });

  return {
    title: response.data.page.title,
    description: response.data.page.description,
  };
};

export const generateStaticParams = async () => {
  const paths = await getWritingArchivePaths();
  return paths.map(value => value.params);
};

export default GistpenArchive;
