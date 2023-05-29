import { getTalksArchivePageProps } from '@tina/server';
import { TalksArchive } from '@talks/archive';

const TalksArchivePage = props => {
  return <TalksArchive talks={props.extra.talks} />;
};

export const getStaticProps = async () => {
  return {
    props: await getTalksArchivePageProps(),
  };
};

export default TalksArchivePage;
