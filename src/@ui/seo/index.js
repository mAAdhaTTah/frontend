import { NextSeo } from 'next-seo';

export const SEO = ({ title, description, children }) => (
  <>
    <NextSeo title={title} description={description} />
    {children}
  </>
);
