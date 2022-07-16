import { server } from '@app/config';
import { TinaPage } from '@tina/page';
import { getReadingPageProps } from '@tina/server';

const ReadingPage = ({ response, extra }) => {
  return <TinaPage response={response} extra={extra} />;
};

export const getStaticProps = async () => {
  return {
    props: await getReadingPageProps(),
    revalidate: server.DEFAULT_REVALIDATE_TIME,
  };
};

export default ReadingPage;
