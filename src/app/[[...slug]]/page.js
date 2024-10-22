import { TinaPage } from '@tina/page';
import { getPagePaths, getPageProps } from '@tina/server';

const RootPage = async ({ params }) => {
  const { response, extra } = await getPageProps(params);
  return <TinaPage response={response} extra={extra} />;
};

export const generateStaticParams = async () => {
  const paths = await getPagePaths();
  return paths.map(value => value.params);
};

export default RootPage;