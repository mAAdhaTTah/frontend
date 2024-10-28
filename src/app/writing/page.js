import { VaultPage } from '@vault/page';
import { getPageProps } from '@vault/server';

const GistpenArchive = async () => {
  const { content } = await getPageProps('writing');
  return <VaultPage content={content} />;
};

/**
 * @returns {Promise<import('next').Metadata>}
 */
export const generateMetadata = async () => {
  const { frontmatter } = await getPageProps('writing');

  return {
    title: frontmatter.title,
    description: frontmatter.description,
  };
};

export default GistpenArchive;
