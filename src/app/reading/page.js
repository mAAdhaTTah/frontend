import { TinaPage } from '@tina/page';
import { getReadingPageProps } from '@tina/server';

const ReadingPage = async () => {
  const { response, extra } = await getReadingPageProps();
  return <TinaPage response={response} extra={extra} />;
};

export default ReadingPage;
