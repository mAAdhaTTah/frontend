import { paramCase } from 'param-case';
import { useMemo } from 'react';
import * as Prezis from '@talks/prezis';
import { getPagePropsBySlug, getTalkArchivePaths } from '@tina/server';

const TalkSingle = ({ slug }) => {
  const Component = useMemo(() => {
    const keys = Object.keys(Prezis);
    const paramCaseKeys = keys.map(key => paramCase(key));
    const idx = paramCaseKeys.indexOf(paramCase(slug));
    const key = keys[idx];
    return Prezis[key].component;
  }, [slug]);
  return <Component />;
};

/** @type {import('next').GetStaticPaths} */
export const getStaticPaths = async () => {
  return {
    paths: await getTalkArchivePaths(),
    fallback: false,
  };
};

/** @type {import('next').GetStaticProps} */
export const getStaticProps = async ({ params }) => {
  return {
    props: {
      ...params,
      ...(await getPagePropsBySlug('talks/__single__')),
    },
  };
};

export default TalkSingle;
