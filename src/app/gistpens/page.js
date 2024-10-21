import { TinaPage } from '@tina/page';
import { getGistpenArchiveProps } from '@tina/server';

const GistpenArchive = async ({ params }) => {
  const { response, extra } = await getGistpenArchiveProps({ page: 1 });
  return <TinaPage response={response} extra={extra} />;
};

export default GistpenArchive;
