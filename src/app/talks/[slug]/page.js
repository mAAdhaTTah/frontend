import { paramCase } from 'param-case';
import * as Prezis from '@talks/prezis';
import { getPagePropsBySlug, getTalkArchivePaths } from '@tina/server';

const TalkSingle = async ({ params }) => {
  const { slug } = {
    ...params,
    ...(await getPagePropsBySlug('talks/__single__')),
  };

  const Component = (() => {
    const keys = Object.keys(Prezis);
    const paramCaseKeys = keys.map(key => paramCase(key));
    const idx = paramCaseKeys.indexOf(paramCase(slug));
    const key = keys[idx];
    return Prezis[key].component;
  })();
  return <Component />;
};

export const generateStaticParams = async () => {
  const paths = await getTalkArchivePaths();
  return paths.map(value => value.params);
};

export default TalkSingle;
