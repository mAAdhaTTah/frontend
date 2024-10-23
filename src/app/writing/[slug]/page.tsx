import { TinaPage } from '@tina/page';
import { getWritingPaths, getWritingSingleProps } from '@tina/server';

const WritingSingle = async ({ params }: any) => {
  const { response, extra } = await getWritingSingleProps(params.slug);
  return <TinaPage response={response} extra={extra} />;
};

/**
 * @returns {Promise<import('next').Metadata>}
 */
export const generateMetadata = async ({ params }: any) => {
  const { extra } = await getWritingSingleProps(params.slug);

  return {
    title: (extra.post.data.post as any).title,
    description: (extra.post.data.post as any).excerpt,
  };
};

export const generateStaticParams = async () => {
  const paths = await getWritingPaths();
  return paths.map((value: any) => value.params);
};

export default WritingSingle;
