import { shared } from '@app/config';
import Head from 'next/head';
import PropTypes from 'prop-types';
import { HOME_SLUG } from '@strapi/api';
import { avatarImage } from '../../components/images';

export const PageSEO = ({
  title,
  description,
  url,
  pageType,
  keywords,
  socialImage,
  siteName,
  facebookAuthor,
  twitterCreator,
  modifiedTime,
}) => (
  <Head>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta name="robots" content="index, follow" />
    <meta
      name="googlebot"
      content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
    />
    <meta
      name="bingbot"
      content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
    />
    <meta name="keywords" content={keywords} />
    <meta property="og:locale" content="en_US" />
    <meta property="og:url" content={url} />
    <meta property="og:type" content={pageType} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={socialImage.src} />
    <meta property="og:image:width" content={socialImage.width} />
    <meta property="og:image:height" content={socialImage.height} />
    <meta property="og:image:alt" content={socialImage.alt} />
    <meta property="og:site_name" content={siteName} />
    <meta property="article:author" content={facebookAuthor} />
    <meta property="article:publisher" content={facebookAuthor} />
    <meta property="article:modified_time" content={modifiedTime} />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:creator" content={twitterCreator} />
    <meta name="twitter:site" content={twitterCreator} />
    <link rel="canonical" href={url} />
  </Head>
);

PageSEO.propTypes = {
  title: PropTypes.string.isRequired,
};

export const getPageSEOProps = page => ({
  title: page.title,
  description: page.seo.description,
  url: `https://${shared.DOMAIN}/${
    page.slug === HOME_SLUG ? '' : `${page.slug}/`
  }`,
  pageType: page.seo.type,
  keywords: page.seo.keywords,
  socialImage: page.seo.social_image ?? avatarImage,
  siteName: 'James DiGioia', // TODO
  facebookAuthor: 'https://www.facebook.com/james.digioia', // TODO
  twitterCreator: '@JamesDiGioia', // TODO
  modifiedTime: page.updated_at,
});
