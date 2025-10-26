import { VaultPage } from '@vault/page';
import { getPagePaths, getPageProps } from '@vault/server';

const RootPage = async ({ params }) => {
  const { content, frontmatter, source } = await getPageProps(
    params.slug?.join('/') ?? '',
  );
  return (
    <VaultPage content={content} frontmatter={frontmatter} source={source} />
  );
};

/**
 * @returns {Promise<import('next').Metadata>}
 */
export const generateMetadata = async ({ params }) => {
  const { frontmatter } = await getPageProps(params.slug?.join('/') ?? '');

  return {
    title: frontmatter.web.title,
    description: frontmatter.web.description,
  };
};

export const generateStaticParams = async () => {
  return await getPagePaths();
};

export default RootPage;
