import { TinaPage } from '@tina/page';
import { getPagePaths, getPageProps } from '@tina/server';

const RootPage = ({ response, extra }) => {
  return <TinaPage response={response} extra={extra} />;
};

/** @type {import('next').GetStaticPaths<{slug: string[]}>} */
export const getStaticPaths = async () => {
  return {
    paths: await getPagePaths(),
    fallback: false,
  };
};

/** @type {import('next').GetStaticProps} */
export const getStaticProps = async ({ params }) => {
  return {
    props: await getPageProps(params),
  };
};

export default RootPage;
