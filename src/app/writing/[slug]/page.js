import { TinaPage } from '@tina/page';
import { getWritingPaths, getWritingSingleProps } from '@tina/server';

const WritingSingle = async ({ params }) => {
  const { response, extra } = await getWritingSingleProps(params.slug);
  return <TinaPage response={response} extra={extra} />;
};

export const generateStaticParams = async () => {
  const paths = await getWritingPaths();
  return paths.map(value => value.params);
};

export default WritingSingle;
