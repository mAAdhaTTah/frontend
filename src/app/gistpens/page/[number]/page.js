import { TinaPage } from '@tina/page';
import { getGistpenArchivePaths, getGistpenArchiveProps } from '@tina/server';

const GistpenArchive = async ({ params }) => {
  const { response, extra } = await getGistpenArchiveProps({
    page: Number(params.number),
  });
  return <TinaPage response={response} extra={extra} />;
};

export const generateStaticParams = async () => {
  const paths = await getGistpenArchivePaths();
  return paths.map(value => value.params);
};

export default GistpenArchive;
