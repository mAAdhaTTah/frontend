import { TinaPage } from '@tina/page';
import { getWritingArchiveProps } from '@tina/server';

const GistpenArchive = ({ response, extra }) => {
  return <TinaPage response={response} extra={extra} />;
};

export const getStaticProps = async () => {
  return {
    props: await getWritingArchiveProps({ page: 1 }),
  };
};

export default GistpenArchive;
