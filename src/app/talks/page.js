import { getTalksArchivePageProps } from '@tina/server';
import { TalksArchive } from '@talks/archive';

const TalksArchivePage = async () => {
  const props = await getTalksArchivePageProps();
  return <TalksArchive talks={props.extra.talks} />;
};

export default TalksArchivePage;
