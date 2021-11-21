import { strapi } from '@strapi/api';
import { getPageLayoutProps, StrapiPage } from '@strapi/page';

const NotFoundPage = ({ page }) => {
  return <StrapiPage page={page} />;
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
    },
  };
};

export default NotFoundPage;
