import { TinaPage } from '@tina/page';
import { getReadingPageProps } from '@tina/server';

const ReadingPage = async () => {
  const { response, extra } = await getReadingPageProps();
  return <TinaPage response={response} extra={extra} />;
};

/**
 * @returns {Promise<import('next').Metadata>}
 */
export const generateMetadata = async () => {
  const { response } = await getReadingPageProps();

  return {
    title: response.data.page.title,
    description: response.data.page.description,
  };
};

export default ReadingPage;
