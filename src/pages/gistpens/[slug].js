import React from 'react';
import { withSEO } from '../../decorators';
import { Gistpen } from '../../components';
import {
  getGistpenBySlug,
  getGistpenSlugPaths,
  getLayoutProps,
} from '../../api';
import { DEFAULT_REVALIDATE_TIME } from '../../constants';

const GistpenSingle = ({ post }) => {
  return <Gistpen {...post} />;
};

/** @type {import('next').GetStaticPaths} */
export const getStaticPaths = async () => {
  return {
    paths: await getGistpenSlugPaths(),
    fallback: 'blocking',
  };
};

/** @type {import('next').GetStaticProps} */
export const getStaticProps = async ({ params }) => {
  try {
    const { post, seo } = await getGistpenBySlug({
      slug: params.slug,
    });
    return {
      props: {
        layout: await getLayoutProps(),
        seo,
        post,
      },
      revalidate: DEFAULT_REVALIDATE_TIME,
    };
  } catch {
    return {
      notFound: true,
    };
  }
};

export default withSEO()(GistpenSingle);
