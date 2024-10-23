// @ts-expect-error TS(2307) FIXME: Cannot find module 'param-case' or its correspondi... Remove this comment to see the full error message
import { paramCase } from 'param-case';
import * as Prezis from '@talks/prezis';
import { getTalkArchivePaths } from '@tina/server';

type PageProps = {
  params: {
    slug: string;
  };
};

const TalkSingle = async ({ params }: PageProps) => {
  const { slug } = params;
  const Component = (() => {
    const keys = Object.keys(Prezis);
    const paramCaseKeys = keys.map(key => paramCase(key));
    const idx = paramCaseKeys.indexOf(paramCase(slug));
    const key = keys[idx];
    // @ts-expect-error TS(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    return Prezis[key].component;
  })();
  return <Component />;
};

/**
 * @returns {Promise<import('next').Metadata>}
 */
export const generateMetadata = async ({ params: { slug } }: PageProps) => {
  const keys = Object.keys(Prezis);
  const paramCaseKeys = keys.map(key => paramCase(key));
  const idx = paramCaseKeys.indexOf(paramCase(slug));
  const key = keys[idx];
  // @ts-expect-error TS(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  const prezi = Prezis[key];

  return {
    title: prezi.title,
    description: prezi.description,
  };
};

export const generateStaticParams = async () => {
  const paths = await getTalkArchivePaths();
  return paths.map(value => value.params);
};

export default TalkSingle;
