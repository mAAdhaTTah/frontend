import { serialize } from 'next-mdx-remote/serialize';
import { HOME_SLUG, resolveSegments, strapi } from '@strapi/api';
import { getPageLayoutProps, StrapiPage } from '@strapi/page';
import { server } from '@app/config';
import {
  getLayoutProps,
  getPageSlugs,
  getPostSlugs,
  getContextBySlug,
} from '@wp/api';
import { Post } from '../components';
import { Page } from '../containers/Page';
import { SEO } from '../decorators/withSEO';

const RootPage = ({ type, page, source, seo, data }) => {
  switch (type) {
    case 'strapi':
      return <StrapiPage page={page} source={source} />;
    case 'wp':
      return (
        <SEO {...seo}>
          {data.format ? <Post.Article {...data} /> : <Page {...data} />}
        </SEO>
      );
    default:
      throw new Error(`Invalid type ${type}`);
  }
};

/** @type {import('next').GetStaticPaths} */
export const getStaticPaths = async () => {
  return {
    paths: [
      ...(await strapi.get('/pages')).data.map(page => ({
        params: {
          slug: resolveSegments(page),
        },
      })),
      ...(await getPageSlugs()),
      ...(await getPostSlugs()),
    ],
    fallback: 'blocking',
  };
};

/** @type {import('next').GetStaticProps} */
export const getStaticProps = async ({ params }) => {
  const paramsSlug = params.slug;
  const slug =
    paramsSlug == null
      ? HOME_SLUG
      : Array.isArray(paramsSlug)
      ? paramsSlug.join('/')
      : paramsSlug;

  try {
    const response = await strapi.get(`/pages?slug=${slug}`);

    if (response.data.length === 1) {
      const [page] = response.data;
      return {
        props: {
          type: 'strapi',
          layout: getPageLayoutProps(page),
          page,
          source: await serialize(page.body),
        },
        revalidate: server.DEFAULT_REVALIDATE_TIME,
      };
    }

    const { data, seo } = await getContextBySlug(slug);

    return {
      props: {
        type: 'wp',
        layout: await getLayoutProps(),
        data,
        seo,
      },
      revalidate: data.format
        ? server.DEFAULT_REVALIDATE_TIME
        : server.LONG_REVALIDATE_TIME,
    };
  } catch (error) {
    if (error.code === 'SLUG_NOT_FOUND') {
      return {
        notFound: true,
      };
    }

    throw error;
  }
};

export default RootPage;
