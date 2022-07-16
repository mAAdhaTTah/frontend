import { TinaPage } from '@tina/page';
import { getWritingPaths, getWritingSingleProps } from '@tina/server';

const WritingSingle = ({ response, extra }) => {
  return <TinaPage response={response} extra={extra} />;
};

/** @type {import('next').GetStaticPaths} */
export const getStaticPaths = async () => {
  return {
    paths: await getWritingPaths(),
    fallback: false,
  };
};

/** @type {import('next').GetStaticProps} */
export const getStaticProps = async ({ params }) => {
  return {
    props: await getWritingSingleProps(params.slug),
  };
};

export default WritingSingle;
