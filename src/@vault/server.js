import path from 'node:path';
import { readdir, readFile } from 'node:fs/promises';
import cc from 'classcat';
import { notFound } from 'next/navigation';
import remarkGfm from 'remark-gfm';
import { compileMDX } from 'next-mdx-remote/rsc';
import { smartypants } from 'smartypants';
import * as z from 'zod';
import { compareDesc, format, formatISO, isValid, parseISO } from 'date-fns';
import { VFile } from 'vfile';
import { matter } from 'vfile-matter';
import rehypeMdxCodeProps from 'rehype-mdx-code-props';
import NextLink from 'next/link';
import { cacheLife } from 'next/cache';
import { ReadingList } from '@reading/server';
import { Resume } from '@ui/resume';
import { RecentEssays, ServerEmbed, ServerImage } from '@ui/server';
import { Code, Heading, Link, Paragraph } from '@ui/typography';
import { Snippet, TalksArchive } from '@ui/components';
import { Ol, Ul, Li, Blockquote } from '@ui/atoms';

const jobToPosition = job => ({
  title: job.position,
  start: format(parseISO(job.startDate), 'MMMM yyyy'),
  end: job.endDate && format(parseISO(job.endDate), 'MMMM yyyy'),
  responsibilities: job.highlights,
});

const DataEmbedBefore = ({ data }) => {
  if (data.tags.includes('resume')) {
    const resume = data;
    return (
      <Resume
        name={resume.basics.name}
        location={`${resume.basics.location.city}, ${resume.basics.location.region}`}
        description={resume.basics.summary}
        experiences={resume.work.reduce((exps, job) => {
          const lastExp = exps[exps.length - 1];
          if (lastExp?.companyName === job.name) {
            lastExp.positions.push(jobToPosition(job));
          } else {
            exps.push({
              companyName: job.name,
              description: job.summary,
              positions: [jobToPosition(job)],
            });
          }
          return exps;
        }, [])}
        projects={resume.projects.map(project => ({
          name: project.name,
          url: project.url,
          role: project.roles.join(', '),
          highlights: project.highlights,
        }))}
        talks={resume.publications.map(pub => ({
          name: pub.name,
          url: pub.url,
        }))}
        volunteering={resume.volunteer.map(vol => ({
          name: vol.organization,
          highlights: vol.highlights,
        }))}
        skills={resume.skills.map(skill => ({
          name: skill.name,
          keywords: skill.keywords,
        }))}
      />
    );
  }
  if (data.tags.includes('media')) {
    return <ServerImage src={data.source} altText={data.alt} />;
  }
  return null;
};

const DataEmbedAfter = ({ data }) => {
  return null;
};

const ContentEmbedBefore = ({ page }) => {
  return null;
};

const ContentEmbedAfter = ({ page }) => {
  return null;
};

export const InternalEmbed = async ({ url, children }) => {
  const slug = url.replace('/vault/', '').replace('.md', '');
  if (slug.startsWith('_data/')) {
    const data = await getData(slug.replace('_data/', ''));
    return (
      <>
        <DataEmbedBefore data={data} />
        {children}
        <DataEmbedAfter data={data} />
      </>
    );
  }

  const { bySlug } = await getAllVaultPages();
  const page = bySlug[slug];

  return (
    <>
      <ContentEmbedBefore page={page} />
      {children}
      <ContentEmbedAfter page={page} />
    </>
  );
};

const compile = (/** @type {string} */ source) =>
  compileMDX({
    source: source
      .replaceAll(` { "layout": "center" }`, '')
      .replaceAll(` { "layout": "columns" }`, ''),
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        rehypePlugins: [
          [rehypeMdxCodeProps, { elementAttributeNameCase: 'html' }],
        ],
        remarkPlugins: [remarkGfm],
      },
    },
    components: {
      p: Paragraph,
      code: Code,
      a: props => {
        if (props.href.startsWith('#')) {
          return <NextLink {...props} />;
        }

        return (
          <Link href={props.href.replace('/vault', '').replace('.md', '/')}>
            {props.children}
          </Link>
        );
      },
      img: ServerEmbed,
      h1: props => (
        <Heading level={1} variant="h-1">
          {props.children}
        </Heading>
      ),
      h2: props => (
        <Heading level={2} variant="h-2" className={props.className}>
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
      li: props => <Li id={props.id}>{props.children}</Li>,
      lic: ({ children }) => <Paragraph className="pb-0">{children}</Paragraph>,
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
      blockquote: props => <Blockquote>{props.children}</Blockquote>,
      section: props => (
        <section
          {...props}
          className={
            props.className === 'footnotes'
              ? 'border-t border-darkg pt-3'
              : props.className
          }
        />
      ),
      table: ({ children }) => <table className="table-auto">{children}</table>,
      thead: ({ children }) => (
        <thead className={cc(['mb-5', 'font-muli', 'text-xl', 'text-left'])}>
          {children}
        </thead>
      ),
      tbody: ({ children }) => (
        <tbody className={cc(['mb-5', 'font-muli', 'text-md', 'text-left'])}>
          {children}
        </tbody>
      ),
      td: ({ children }) => <td className="py-1">{children}</td>,
      RecentEssays,
      ReadingList,
      InternalEmbed,
      Snippets: async () => {
        const { pages } = await getAllVaultPages();

        return pages.reduce((output, page) => {
          if (page.frontmatter.snippet) {
            output.push(
              <>
                <Heading level={1} variant="article">
                  {page.frontmatter.web.title}
                </Heading>
                {page.content}
              </>,
            );
          }
          return output;
        }, []);
      },
      TalksServerArchive: async () => {
        const { pages } = await getAllVaultPages();

        const talks = pages
          .filter(page => page.frontmatter.talk)
          .map(
            ({
              frontmatter: {
                web: { title, description, slug },
              },
            }) => ({
              title,
              description,
              slug,
            }),
          );

        return <TalksArchive talks={talks} />;
      },
    },
  });

const REFERENCE_REGEX =
  /((\[(?<title>.*)\]\((?<url>.*)\))|(\[\[(?<filename>.*)\]\]))/;

const EmptyToNullSchema = z
  .any()
  .transform(val => (val === '' || val === undefined ? null : val));

const DataSchema = z
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

const ContentSchema = z
  .string()
  .regex(REFERENCE_REGEX)
  .transform(async value => {
    const { url } = REFERENCE_REGEX.exec(value).groups;

    const read = path.join(CWD, url);
    const source = await readFile(read, 'utf8');
    const { frontmatter } = await compile(source);
    return parseFrontmatter(frontmatter, read);
  });

const MediaReferenceSchema = EmptyToNullSchema.pipe(DataSchema).pipe(
  z.object({
    title: z.string(),
    source: z.url(),
    alt: z.string(),
    caption: z.string(),
  }),
);

const ContentReferenceSchema = EmptyToNullSchema.pipe(ContentSchema);

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
      url: z.url(),
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
      image: z.url().optional(),
      summary: z.string().optional(),
      url: z.url(),
      title: z.string(),
      authors: z.array(ContentReferenceSchema).optional(),
      parent: ContentReferenceSchema.optional(),
      interpretations: z.array(ContentReferenceSchema).optional(),
    })
    .optional(),
  view: z.object({}).optional(),
  snippet: z.object({}).optional(),
  link: z
    .object({
      title: z.string(),
      url: z.url(),
      bookmarked_at: ISODateSchema,
      related: z.array(ContentReferenceSchema).optional(),
    })
    .optional(),
  resume: z.any().optional(),
  talk: z.any().optional(),
});

const CWD = process.cwd();

/**
 * Remove Obsidian anchors from markdown content
 * @param {string} content - The markdown content
 * @returns {string} - Content with anchors removed
 */
const removeObsidianAnchors = content =>
  // Remove inline anchors (space followed by ^anchor)
  // Remove standalone anchors (^anchor on its own line)
  content
    .replace(/ \^[a-zA-Z0-9-_]+/g, '') // inline anchors
    .replace(/^\^[a-zA-Z0-9-_]+$/gm, ''); // standalone anchors

/**
 * @typedef {{
 *  source: string;
 *  mdFilePath: string;
 *  frontmatter: PageFMSchema
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

export const readAllVaultPages = async () => {
  'use cache';
  cacheLife('max');
  /** @type Source[] */
  const sources = [];
  /** @type Record<string, Source> */
  const bySlug = {};
  const walkDir = async (/** @type {string} */ dir) => {
    const entries = await readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isFile() && entry.name.endsWith('.md')) {
        const mdFilePath = path.join(dir, entry.name);
        let source = await readFile(mdFilePath, 'utf8');
        source = removeObsidianAnchors(source);
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
              frontmatter,
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
};

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
      source,
    };
    pages.push((bySlug[page.frontmatter.web.slug] = page));
  }

  pages.sort((a, b) =>
    compareDesc(a.frontmatter.web.published_at, b.frontmatter.web.published_at),
  );

  return { bySlug, pages };
};

export const getPageProps = async (/** @type {string} */ slug) => {
  'use cache';

  const { bySlug } = await readAllVaultPages();

  const page = bySlug[slug];
  if (!page) return notFound();
  const { content, frontmatter } = await compile(page.source);
  return {
    frontmatter: await parseFrontmatter(frontmatter, page.mdFilePath),
    content,
    source: page.source,
  };
};

export const getPagePaths = async () => {
  'use cache';

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
  'use cache';

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
  .object({ header: HeaderSchema, nav: MenuSchema })
  .transform(({ header, nav }) => {
    /**
     * @type {{
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
  'use cache';
  const [header, nav] = await Promise.all([getData('header'), getData('menu')]);
  return await LayoutSchema.parseAsync({ header, nav });
};

export const getRecentEssayExcerpts = async () => {
  'use cache';

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

    if (essays.length >= 10) {
      break;
    }
  }

  return essays;
};
