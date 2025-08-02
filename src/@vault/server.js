import path from 'node:path';
import { readdir, readFile } from 'node:fs/promises';
import { notFound } from 'next/navigation';
import { compileMDX } from 'next-mdx-remote/rsc';
import { Ol, Ul, Li } from '@ui/atoms';
import { Snippet } from '@ui/components';
import { Code, Heading, Link, Paragraph } from '@ui/typography';
import { smartypants } from 'smartypants';
import { RecentEssays, ServerEmbed, ServerImage } from '@ui/server';
import { z } from 'zod';
import { compareDesc, format, formatISO, isValid, parseISO } from 'date-fns';
import { unstable_cache } from 'next/cache';
import { VFile } from 'vfile';
import { matter } from 'vfile-matter';
import rehypeMdxCodeProps from 'rehype-mdx-code-props';
import { ReadingList } from '@reading/server';

const InternalEmbedBefore = ({ page }) => {
  return null;
};

const InternalEmbedAfter = ({ page }) => {
  return null;
};

const InternalEmbed = async ({ url, children }) => {
  const { bySlug } = await getAllVaultPages();
  const page = bySlug[url.replace('/vault/', '').replace('.md', '')];

  return (
    <>
      <InternalEmbedBefore page={page} />
      {children}
      <InternalEmbedAfter page={page} />
    </>
  );
};

const compile = (/** @type {string} */ source) =>
  compileMDX({
    source,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        rehypePlugins: [
          [rehypeMdxCodeProps, { elementAttributeNameCase: 'html' }],
        ],
      },
    },
    components: {
      p: Paragraph,
      code: Code,
      a: props => (
        <Link href={props.href.replace('/vault', '').replace('.md', '/')}>
          {props.children}
        </Link>
      ),
      img: ServerEmbed,
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
      pre: props => {
        // TODO This logic kinda sucks, can we improve?
        if (props.children?.type !== Code) return <pre {...props} />;

        const language = props.children.props.className.replace(
          'language-',
          '',
        );

        // TODO is this what we want to do here?
        if (language === 'datacorejsx') {
          return null;
        }

        return (
          <Snippet
            filename={props.title}
            language={language}
            code={props.children.props.children.trim()}
          />
        );
      },
      RecentEssays,
      ReadingList,
      InternalEmbed,
    },
  });

const REFERENCE_REGEX =
  /((\[(?<title>.*)\]\((?<url>.*)\))|(\[\[(?<filename>.*)\]\]))/;

const EmptyToNullSchema = z
  .any()
  .transform(val => (val === '' || val === undefined ? null : val));

const ReferenceSchema = z
  .string()
  .regex(REFERENCE_REGEX)
  .transform(async value => {
    const { filename, url = `vault/_data/${filename}.md` } =
      REFERENCE_REGEX.exec(value).groups;

    const read = path.join(CWD, url);
    const source = await readFile(read, 'utf8');
    const { frontmatter } = await compile(source);
    return frontmatter;
  });

const MediaReferenceSchema = EmptyToNullSchema.pipe(ReferenceSchema).pipe(
  z.object({
    title: z.string(),
    source: z.string().url(),
    alt: z.string(),
    caption: z.string(),
  }),
);

const ContentReferenceSchema = EmptyToNullSchema.pipe(ReferenceSchema).pipe(
  z.object({}),
);

const ISODateSchema = z
  .string()
  .transform(value => parseISO(value))
  .refine(date => isValid(date), 'Date is invalid')
  .pipe(z.date());

/** @typedef {z.infer<typeof PageFMSchema>} PageFMSchema */

const PageFMSchema = z.object({
  web: z.object({
    title: z.string(),
    description: z.string().nullable(),
    slug: z.string(),
    updated_at: ISODateSchema,
    published_at: ISODateSchema,
  }),
  concept: z
    .object({
      parent: ContentReferenceSchema.nullable(),
      next: ContentReferenceSchema.nullable(),
      previous: ContentReferenceSchema.nullable(),
    })
    .optional(),
  embed: z
    .object({
      url: z.string().url(),
    })
    .optional(),
  essay: z
    .object({
      excerpt: z.string(),
      // TODO this should just be nullable right?
      featuredMedia: MediaReferenceSchema.optional().nullable(),
    })
    .optional(),
  gallery: z
    .object({
      images: z.array(MediaReferenceSchema),
    })
    .optional(),
  image: z
    .object({
      media: MediaReferenceSchema,
    })
    .optional(),
  reference: z
    .object({
      image: z.string().url().optional(),
      summary: z.string().optional(),
      url: z.string().url(),
      title: z.string(),
      authors: z.array(ContentReferenceSchema).optional(),
      parent: ContentReferenceSchema.optional(),
      interpretations: z.array(ContentReferenceSchema).optional(),
    })
    .optional(),
  view: z.object({}).optional(),
  snippet: z.object({}).optional(),
});

const CWD = process.cwd();

/**
 * @typedef {{
 *  source: string;
 *  mdFilePath: string;
 * }} Source
 */

const parseFrontmatter = async (
  /** @type {{ tags: string[]; [key: string]: unknown}} */ fm,
  /** @type {string} */ mdFilePath,
) =>
  await PageFMSchema.parseAsync(
    fm.tags.reduce(
      (f, tag) => ({
        ...f,
        [tag]: fm,
      }),
      {},
    ),
  ).catch(err => {
    if (err instanceof z.ZodError) {
      console.error(err);
      throw new Error(`Error parsing ${mdFilePath.replace(CWD, '')}`, {
        cause: err,
      });
    }

    throw err;
  });

const readAllVaultPages = unstable_cache(async () => {
  /** @type Source[] */
  const sources = [];
  /** @type Record<string, Source> */
  const bySlug = {};
  const walkDir = async (/** @type {string} */ dir) => {
    const entries = await readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isFile() && entry.name.endsWith('.md')) {
        const mdFilePath = path.join(dir, entry.name);
        const source = await readFile(mdFilePath, 'utf8');
        const vfile = new VFile(source);

        // makes frontmatter available via vfile.data.matter
        matter(vfile, { strip: true });
        const fm = vfile.data.matter;
        if (
          fm &&
          typeof fm === 'object' &&
          'tags' in fm &&
          Array.isArray(fm.tags) &&
          fm.tags.every(tag => typeof tag === 'string') &&
          fm.tags.includes('web')
        ) {
          const frontmatter = await parseFrontmatter(fm, mdFilePath);
          sources.push(
            (bySlug[frontmatter.web.slug] = {
              source,
              mdFilePath,
            }),
          );
        }
      }

      if (entry.isDirectory()) {
        await walkDir(path.join(dir, entry.name));
      }
    }
  };
  await walkDir(CWD);

  return { sources, bySlug };
});

/**
 * @typedef {{
 *  content: import('react').ReactElement;
 *  frontmatter: z.infer<typeof PageFMSchema>;
 * }} Page
 */

/** @type {() => Promise<{ pages: Page[]; bySlug: Record<string, Page>}>} */
export const getAllVaultPages = async () => {
  /** @type Page[] */
  const pages = [];
  /** @type Record<string, Page> */
  const bySlug = {};

  const { sources } = await readAllVaultPages();
  for (const { source, mdFilePath } of sources) {
    const { content, frontmatter } = await compile(source);
    const page = {
      frontmatter: await parseFrontmatter(frontmatter, mdFilePath),
      content,
    };
    pages.push((bySlug[page.frontmatter.web.slug] = page));
  }

  pages.sort((a, b) =>
    compareDesc(a.frontmatter.web.published_at, b.frontmatter.web.published_at),
  );

  return { bySlug, pages };
};

export const getPageProps = async (/** @type {string} */ slug) => {
  const { bySlug } = await readAllVaultPages();

  const source = bySlug[slug];
  if (!source) return notFound();
  const { content, frontmatter } = await compile(source.source);
  const page = {
    frontmatter: await parseFrontmatter(frontmatter, source.mdFilePath),
    content,
  };
  return page;
};

export const getPagePaths = async () => {
  const { pages } = await getAllVaultPages();
  /**
   * @type {{slug: string[];}[]}
   */
  const paths = [];

  return pages.reduce((list, page) => {
    list.push({
      slug: page.frontmatter.web.slug.split('/'),
    });
    return list;
  }, paths);
};

const getData = async (/** @type {string} */ target) => {
  const source = await readFile(
    path.join(CWD, 'vault/_data', `${target}.md`),
    'utf8',
  );

  const { frontmatter } = await compile(source);
  return frontmatter;
};

const HeaderSchema = z.object({
  title: z.string(),
  description: z.string(),
  background: MediaReferenceSchema,
  avatar: MediaReferenceSchema,
});
const MenuSchema = z.object({
  name: z.string(),
  items: z.array(
    z.object({
      text: z.string(),
      href: z.string(),
    }),
  ),
});

const LayoutSchema = z
  .tuple([HeaderSchema, MenuSchema])
  .transform(([header, nav]) => {
    /** @type {{
     *  header: Omit<import('@ui/layout/Header').HeaderProps, 'fullScreen'>
     *  nav: import('@ui/layout/Nav').NavProps
     * }} */
    const result = {
      header: {
        title: header.title,
        description: header.description,
        avatarImage: (
          <ServerImage
            {...{
              src: header.avatar.source,
              altText: header.avatar.alt,
            }}
            priority
          />
        ),
        backgroundImage: (
          <ServerImage
            {...{
              src: header.background.source,
              altText: header.background.alt,
            }}
            priority
            className="absolute h-full w-full top-0 left-0 right-0 bottom-0 object-cover object-center"
          />
        ),
      },
      nav: {
        links: nav.items.map(item => ({
          to: item.href,
          text: item.text,
        })),
      },
    };

    return result;
  });

export const getLayoutProps = async () => {
  return await LayoutSchema.parseAsync(
    await Promise.all([getData('header'), getData('menu')]),
  );
};

export const getRecentEssayExcerpts = async () => {
  const { pages } = await getAllVaultPages();
  const essays = [];
  for (const page of pages) {
    if (page.frontmatter.essay) {
      essays.push({
        id: page.frontmatter.web.slug,
        format: 'standard',
        slug: '/' + page.frontmatter.web.slug,
        title: page.frontmatter.web.title,
        date: format(page.frontmatter.web.published_at, 'MMMM do, yyyy'),
        dateTime: formatISO(page.frontmatter.web.published_at),
        commentCount: 0,
        author: {
          name: 'James DiGioia',
        },
        excerpt: <Paragraph>{page.frontmatter.essay.excerpt}</Paragraph>,
      });
    }
  }

  return essays;
};
