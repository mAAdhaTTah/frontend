import { Article } from '@ui/box';
import { Mdx } from '@ui/mdx';
import { getPageSEOProps, PageSEO } from './seo';

const PageBody = ({ body }) => {
  return (
    <Article>
      <Mdx content={body} />
    </Article>
  );
};
const templates = {
  full_screen: PageBody,
  page: PageBody,
};

export const StrapiPage = ({ page }) => {
  const Component = templates[page.template];

  if (!Component) {
    throw new Error(`Invalid page template ${page.template}`);
  }

  return (
    <>
      <PageSEO {...getPageSEOProps(page)} />
      <Component {...page} />
    </>
  );
};
