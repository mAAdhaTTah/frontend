import { TinaPage } from '@tina/page';
import { getGistpenArchiveProps } from '@tina/server';

const GistpenArchive = ({ response, extra }) => {
  return <TinaPage response={response} extra={extra} />;
};

export const getStaticProps = async () => {
  return {
    props: await getGistpenArchiveProps({ page: 1 }),
  };
};

export default GistpenArchive;
