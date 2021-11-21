import PropTypes from 'prop-types';
import { Article } from '@ui/box';
import { Mdx } from '@ui/mdx';
import { getPageSEOProps, PageSEO } from './seo';

const PageBody = ({ source }) => {
  return (
    <Article>
      <Mdx source={source} />
    </Article>
  );
};

PageBody.propTypes = {
  source: PropTypes.object.isRequired,
};

const templates = {
  full_screen: PageBody,
  page: PageBody,
};

export const StrapiPage = ({ page, source }) => {
  const Component = templates[page.template];

  if (!Component) {
    throw new Error(`Invalid page template ${page.template}`);
  }

  return (
    <>
      <PageSEO {...getPageSEOProps(page)} />
      <Component {...page} source={source} />
    </>
  );
};
