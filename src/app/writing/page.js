import { TinaPage } from '@tina/page';
import { getWritingArchiveProps } from '@tina/server';

const GistpenArchive = async ({ params }) => {
  const { response, extra } = await getWritingArchiveProps({ page: 1 });
  return <TinaPage response={response} extra={extra} />;
};

export default GistpenArchive;
