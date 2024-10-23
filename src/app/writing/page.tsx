import { TinaPage } from '@tina/page';
import { getWritingArchiveProps } from '@tina/server';

const GistpenArchive = async () => {
  const { response, extra } = await getWritingArchiveProps({ page: 1 });
  return <TinaPage response={response} extra={extra} />;
};

export const generateMetadata = async (): Promise<import('next').Metadata> => {
  const { response } = await getWritingArchiveProps({ page: 1 });

  return {
    title: response.data.page.title,
    description: response.data.page.description,
  };
};

export default GistpenArchive;
