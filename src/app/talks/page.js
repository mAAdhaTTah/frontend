import { paramCase } from 'param-case';
import { TalksArchive } from '@talks/archive';
import * as Prezis from '@talks/prezis';

const talks = Object.entries(Prezis).map(([key, { component, ...talk }]) => ({
  ...talk,
  slug: paramCase(key),
}));

const TalksArchivePage = async () => {
  return <TalksArchive talks={talks} />;
};

/**
 * @returns {Promise<import('next').Metadata>}
 */
export const generateMetadata = async () => {
  return {
    title: 'Talks',
    description: "Slides from the talks & presentations I've given",
  };
};

export default TalksArchivePage;
