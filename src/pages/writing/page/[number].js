import { TinaPage } from '@tina/page';
import { getWritingArchiveProps, getWritingArchivePaths } from '@tina/server';

const GistpenArchive = ({ response, extra }) => {
  return <TinaPage response={response} extra={extra} />;
};

export const getStaticPaths = async () => {
  return {
    paths: await getWritingArchivePaths(),
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  return {
    props: await getWritingArchiveProps({ page: Number(params.number) }),
  };
};

export default GistpenArchive;
