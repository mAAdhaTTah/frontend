import { getTalksArchivePageProps } from '@tina/server';
import { TalksArchive } from '@talks/archive';

const TalksArchivePage = async () => {
  const props = await getTalksArchivePageProps();
  return <TalksArchive talks={props.extra.talks} />;
};

/**
 * @returns {Promise<import('next').Metadata>}
 */
export const generateMetadata = async () => {
  const { response } = await getTalksArchivePageProps();

  return {
    title: response.data.page.title,
    description: response.data.page.description,
  };
};

export default TalksArchivePage;
