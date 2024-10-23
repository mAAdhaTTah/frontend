import { TinaPage } from '@tina/page';
import { getWritingArchiveProps } from '@tina/server';

const GistpenArchive = async ({ params }: any) => {
  const { response, extra } = await getWritingArchiveProps({ page: 1 });
  return <TinaPage response={response} extra={extra} />;
};

/**
 * @returns {Promise<import('next').Metadata>}
 */
export const generateMetadata = async () => {
  const { response } = await getWritingArchiveProps({ page: 1 });

  return {
    title: response.data.page.title,
    description: response.data.page.description,
  };
};

export default GistpenArchive;
