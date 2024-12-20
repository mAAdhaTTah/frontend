import { TinaPage } from '@tina/page';
import { getGistpenArchiveProps } from '@tina/server';

const GistpenArchive = async ({ params }) => {
  const { response, extra } = await getGistpenArchiveProps({ page: 1 });
  return <TinaPage response={response} extra={extra} />;
};

/**
 * @returns {Promise<import('next').Metadata>}
 */
export const generateMetadata = async () => {
  const { response } = await getGistpenArchiveProps({ page: 1 });

  return {
    title: response.data.page.title,
    description: response.data.page.description,
  };
};

export default GistpenArchive;
