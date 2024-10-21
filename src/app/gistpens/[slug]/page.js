import { TinaPage } from '@tina/page';
import { getGistpenPaths, getGistpenSingleProps } from '@tina/server';

const GistpenSingle = async ({ params }) => {
  const { response, extra } = await getGistpenSingleProps(params.slug);
  return <TinaPage response={response} extra={extra} />;
};

export const generateStaticParams = async () => {
  const paths = await getGistpenPaths();
  return paths.map(value => value.params);
};

export default GistpenSingle;
