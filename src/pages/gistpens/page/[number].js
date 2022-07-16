import { TinaPage } from '@tina/page';
import { getGistpenArchivePaths, getGistpenArchiveProps } from '@tina/server';

const GistpenArchive = ({ response, extra }) => {
  return <TinaPage response={response} extra={extra} />;
};

export const getStaticPaths = async () => {
  return {
    paths: await getGistpenArchivePaths(),
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  return {
    props: await getGistpenArchiveProps({ page: Number(params.number) }),
  };
};

export default GistpenArchive;
