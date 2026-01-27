import { VaultPage } from '@vault/page';
import { getPagePaths, getPageProps } from '@vault/server';

const RootPage = async props => {
  const params = await props.params;
  const { content, frontmatter, source } = await getPageProps(
    params.slug?.join('/') ?? '_index',
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
  const { frontmatter } = await getPageProps(
    params.slug?.join('/') ?? '_index',
  );

  return {
    title: frontmatter.web.title,
    description: frontmatter.web.description,
  };
};

export const generateStaticParams = async () => {
  return await getPagePaths();
};

export default RootPage;
