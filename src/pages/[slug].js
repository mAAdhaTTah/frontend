import React from 'react';
import { getLayoutProps, getPageSlugs, getContextBySlug } from '../api';
import { DEFAULT_REVALIDATE_TIME } from '../constants';
import { Page } from '../containers/Page';
import { withSEO } from '../decorators';

/** @typedef {{ slug: string }} SlugParams */
/** @typedef {{ layout: any, seo: any; data: import('react').ComponentProps<typeof Page> }} Props */

const Slug = ({ data }) => {
  return <Page {...data} />;
};

/** @type import('next').GetStaticPaths<SlugParams> */
export const getStaticPaths = async () => {
  return {
    paths: await getPageSlugs(),
    fallback: 'blocking',
  };
};

/** @type import('next').GetStaticProps<Props, SlugParams> */
export const getStaticProps = async ({ params }) => {
  const { data, seo } = await getContextBySlug(params.slug, 'page');

  return {
    props: {
      layout: await getLayoutProps(),
      data,
      seo,
    },
    revalidate: DEFAULT_REVALIDATE_TIME,
  };
};

export default withSEO()(Slug);
