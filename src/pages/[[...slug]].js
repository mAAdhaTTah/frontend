import { TinaPage } from '@tina/page';
import { resolveSlug } from '@tina/routes';
import { getPagePaths, getPageProps, getWritingPaths } from '@tina/server';

const RootPage = ({ response, extra }) => {
  return <TinaPage response={response} extra={extra} />;
};

/** @type {import('next').GetStaticPaths<{slug: string[]}>} */
export const getStaticPaths = async () => {
  return {
    paths: await getPagePaths(),
    // TODO(James) combine w/ writing props and flip back to false
    fallback: 'blocking',
  };
};

/** @type {import('next').GetStaticProps} */
export const getStaticProps = async ({ params }) => {
  const writingSlugs = (await getWritingPaths()).map(
    ({ params }) => params.slug,
  );
  const slug = resolveSlug(params);

  if (writingSlugs.includes(slug)) {
    return {
      redirect: {
        permanent: true,
        destination: `/writing/${slug}`,
      },
    };
  }
  return {
    props: await getPageProps(params),
  };
};

export default RootPage;
