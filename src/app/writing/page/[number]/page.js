import { TinaPage } from '@tina/page';
import { getWritingArchiveProps, getWritingArchivePaths } from '@tina/server';

const GistpenArchive = async ({ params }) => {
  const { response, extra } = await getWritingArchiveProps({
    page: Number(params.number),
  });
  return <TinaPage response={response} extra={extra} />;
};

export const generateStaticParams = async () => {
  const paths = await getWritingArchivePaths();
  return paths.map(value => value.params);
};

export default GistpenArchive;
