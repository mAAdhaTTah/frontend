import path from 'node:path';
import { readdir, readFile } from 'node:fs/promises';
import { unstable_cache as cache } from 'next/cache';
import { notFound } from 'next/navigation';
import { compileMDX } from 'next-mdx-remote/rsc';
import { Ol, Ul, Li } from '@ui/atoms';
import { Snippet } from '@ui/components';
import { Code, Heading, Link, Paragraph } from '@ui/typography';
import { smartypants } from 'smartypants';
import { RecentEssays, ServerImage } from '@ui/server';

const vaultDirectory = path.join(process.cwd(), 'vault');

const getAllVaultPages = cache(async () => {
  const pages = [];

  const walkDir = async (/** @type {string} */ dir) => {
    const entries = await readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isFile() && entry.name.endsWith('.mdx')) {
        const mdFilePath = path.join(dir, entry.name);
        const source = await readFile(mdFilePath, 'utf8');
        const { content, frontmatter } = await compileMDX({
          source,
          options: { parseFrontmatter: true },
          components: {
            p: Paragraph,
            code: Code,
            a: props => <Link href={props.href}>{props.children}</Link>,
            img: ({ src, alt }) => <ServerImage sltText={alt} src={src} />,
            h1: props => (
              <Heading level={1} variant="h-1">
                {props.children}
              </Heading>
            ),
            h2: props => (
              <Heading level={2} variant="h-2">
                {props.children}
              </Heading>
            ),
            h3: props => (
              <Heading level={3} variant="h-3">
                {props.children}
              </Heading>
            ),
            h4: props => (
              <Heading level={4} variant="h-4">
                {props.children}
              </Heading>
            ),
            ol: props => <Ol>{props.children}</Ol>,
            ul: props => <Ul>{props.children}</Ul>,
            li: props => <Li>{props.children}</Li>,
            lic: ({ children }) => <Paragraph>{children}</Paragraph>,
            text: props => <>{smartypants(props.children, '2')}</>,
            code_block: ({ lang, value }) => (
              <Snippet language={lang || 'plaintext'} code={value} />
            ),
            RecentEssays,
          },
        });

        pages.push({
          frontmatter,
          content,
        });
      }

      if (entry.isDirectory()) {
        await walkDir(path.join(dir, entry.name));
      }
    }
  };
  await walkDir(vaultDirectory);

  return pages;
});

export const getPageProps = async slug => {
  const pages = await getAllVaultPages();

  const page = pages.find(page => page.frontmatter.slug === slug);
  if (!page) return notFound();
  return page;
};
