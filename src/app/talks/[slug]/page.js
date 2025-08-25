import { paramCase } from 'param-case';
import * as Prezis from '@talks/prezis';

const getTalkArchivePaths = () =>
  Object.keys(Prezis).map(slug => ({
    params: {
      slug: paramCase(slug),
    },
  }));

const TalkSingle = async ({ params: { slug } }) => {
  const Component = (() => {
    const keys = Object.keys(Prezis);
    const paramCaseKeys = keys.map(key => paramCase(key));
    const idx = paramCaseKeys.indexOf(paramCase(slug));
    const key = keys[idx];
    return Prezis[key].component;
  })();
  return <Component />;
};

/**
 * @returns {Promise<import('next').Metadata>}
 */
export const generateMetadata = async ({ params: { slug } }) => {
  const keys = Object.keys(Prezis);
  const paramCaseKeys = keys.map(key => paramCase(key));
  const idx = paramCaseKeys.indexOf(paramCase(slug));
  const key = keys[idx];
  const prezi = Prezis[key];

  return {
    title: prezi.title,
    description: prezi.description,
  };
};

export const generateStaticParams = async () => {
  const paths = getTalkArchivePaths();
  return paths.map(value => value.params);
};

export default TalkSingle;
