import { notFound } from 'next/navigation';
import { VaultPage } from '@vault/page';
import { getPagePaths, getPageProps } from '@vault/server';

// The homepage is `_index`, served only at `/`.
const toVaultSlug = (/** @type {string[] | undefined} */ slug) => {
  if (!slug?.length) return '_index';
  const joined = slug.join('/');
  if (joined === '_index') notFound();
  return joined;
};

const RootPage = async props => {
  const params = await props.params;
  const { content, frontmatter, source } = await getPageProps(
    toVaultSlug(params.slug),
  );
  return (
    <VaultPage content={content} frontmatter={frontmatter} source={source} />
  );
};

/**
 * @returns {Promise<import('next').Metadata>}
 */
export const generateMetadata = async props => {
  const params = await props.params;
  const { frontmatter } = await getPageProps(toVaultSlug(params.slug));

  return {
    title: frontmatter.web.title,
    description: frontmatter.web.description,
  };
};

export const generateStaticParams = async () => {
  return await getPagePaths();
};

export default RootPage;
