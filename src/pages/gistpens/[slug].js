import { TinaPage } from '@tina/page';
import { getGistpenPaths, getGistpenSingleProps } from '@tina/server';

const GistpenSingle = ({ response, extra }) => {
  return <TinaPage response={response} extra={extra} />;
};

/** @type {import('next').GetStaticPaths} */
export const getStaticPaths = async () => {
  return {
    paths: await getGistpenPaths(),
    fallback: false,
  };
};

/** @type {import('next').GetStaticProps} */
export const getStaticProps = async ({ params }) => {
  return {
    props: await getGistpenSingleProps(params.slug),
  };
};

export default GistpenSingle;
