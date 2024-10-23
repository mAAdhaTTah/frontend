import { TinaPage } from '@tina/page';
import { getWritingPaths, getWritingSingleProps } from '@tina/server';

const WritingSingle = async ({ params }) => {
  const { response, extra } = await getWritingSingleProps(params.slug);
  return <TinaPage response={response} extra={extra} />;
};

/**
 * @returns {Promise<import('next').Metadata>}
 */
export const generateMetadata = async ({ params }) => {
  const { extra } = await getWritingSingleProps(params.slug);

  return {
    title: extra.post.data.post.title,
    description: extra.post.data.post.excerpt,
  };
};

export const generateStaticParams = async () => {
  const paths = await getWritingPaths();
  return paths.map(value => value.params);
};

export default WritingSingle;
