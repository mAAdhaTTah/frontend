import { strapi } from '@strapi/api';
import { getPageLayoutProps, StrapiPage } from '@strapi/page';
import { serialize } from 'next-mdx-remote/serialize';

const NotFoundPage = ({ page, source }) => {
  return <StrapiPage page={page} source={source} />;
};

export const getStaticProps = async () => {
  const response = await strapi.get('/pages', {
    params: {
      slug: '__500__',
      _limit: 1,
    },
  });

  if (!response.data.length) {
    throw response;
  }

  const [page] = response.data;

  return {
    props: {
      layout: getPageLayoutProps(response.data[0]),
      page,
      source: await serialize(page.body),
    },
  };
};

export default NotFoundPage;
