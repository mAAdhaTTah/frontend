import 'server-only';
import path from 'path';
import fs from 'fs/promises';
import { unstable_cache as cache } from 'next/cache';
import { extract } from '@extractus/oembed-extractor';
import { getReadingProps } from '@reading/server';
import {
  FIVE_HUNDRED_SLUG,
  FOUR_OH_FOUR_SLUG,
  HOME_SLUG,
  resolveSegments,
  resolveSlug,
} from '@tina/routes';
import { compareDesc, parseISO } from 'date-fns';
// @ts-expect-error TS(2307) FIXME: Cannot find module 'param-case' or its correspondi... Remove this comment to see the full error message
import { paramCase } from 'param-case';
import { getPlaiceholder } from 'plaiceholder';
import * as Prezis from '@talks/prezis';
import { client } from '../../tina/__generated__/client';
import { GetWritingPostsQuery } from '../../tina/__generated__/types';

export const getLayoutProps = cache(async () => {
  const {
    data: { header, menu },
  } = await client.queries.getHeader();
  return {
    header: {
      title: header.title,
      description: header.description,
      backgroundImage: await getImagePropsFromMedia(header.background),
      avatarImage: await getImagePropsFromMedia(header.avatar),
    },
    nav: {
      links: menu.items!.map(item => ({
        text: item!.text,
        to: item!.href,
      })),
    },
  };
});

type Unpacked<T> = T extends (infer U)[] ? U : T;
type LoadFromPosts = NonNullable<
  NonNullable<Unpacked<GetWritingPostsQuery['postConnection']['edges']>>['node']
>;

const loadExtraFromPosts = cache(
  async (posts: LoadFromPosts | LoadFromPosts[]) => {
    if (!Array.isArray(posts)) {
      posts = [posts];
    }

    const embeds = {},
      media = {};
    const loadEmbed = async (url: string) => {
      try {
        // @ts-expect-error TS(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        embeds[url] = await extract(url);
      } catch {}
    };
    const loadMedia = async (m: {
      title: string;
      source?: string | null;
      altText?: string | null;
    }) => {
      try {
        // @ts-expect-error TS(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        media[m.source] = await getImagePropsFromMedia(m);
      } catch {}
    };
    const processBodyBlock = async block => {
      switch (block.__typename) {
        case 'PostStandardBodyRichText':
        case 'PostGalleryBodyRichText':
        case 'PostLinkBodyRichText':
        case 'PostStatusBodyRichText':
        case 'PostImageBodyRichText':
        case 'PostAudioBodyRichText':
        case 'PostVideoBodyRichText':
        case 'PostQuoteBodyRichText':
          await Promise.all(
            block.content.children.map(element =>
              processRichTextElement(element),
            ),
          );
          break;
        // no default
      }
    };
    const processRichTextElement = async element => {
      const promises = [];
      if (element.type === 'p' || element.type === 'a') {
        for (const innerElement of element.children) {
          promises.push(processRichTextElement(innerElement));
        }
      }
      if (element.type === 'img') {
        promises.push(
          loadMedia({
            source: element.url,
            altText: element.alt,
          }),
        );
      }
      if (element.name === 'Embed') {
        promises.push(loadEmbed(element.props.url));
      }
      if (element.name === 'ExtendedQuote') {
        for (const innerElement of element.props.children.children) {
          promises.push(processRichTextElement(innerElement));
        }
      }
      if (element.name === 'Figure') {
        promises.push(
          loadMedia({
            source: element.props.url,
            altText: element.props.alt ?? '',
          }),
        );
      }

      await Promise.all(promises);
    };
    const promises = [];
    for (const post of posts) {
      switch (post.__typename) {
        case 'PostVideo':
          promises.push(loadEmbed(post!.video!.url!));
          break;
        case 'PostAudio':
          promises.push(loadEmbed(post!.audio!.url!));
          break;
        case 'PostImage':
        case 'PostStandard':
          if (post.featuredMedia) {
            await loadMedia(post.featuredMedia);
          }
          break;
        case 'PostGallery':
          for (const image of post.images!) {
            promises.push(loadMedia(image!.reference!));
          }
          break;
        // no default
      }

      if (Array.isArray(post.body)) {
        for (const block of post.body) {
          promises.push(processBodyBlock(block));
        }
      }
    }

    await Promise.all(promises);

    return { embeds, media };
  },
);

const generatePagesPaths = (count: number, perPage: number) => {
  const numPages = Math.ceil(count / perPage) - 2;

  return [...Array(numPages).fill(2)].map((num, idx) => ({
    params: { number: String(num + idx) },
  }));
};

export const getPagePaths = cache(async () => {
  const postListData = await client.queries.getPageSlugs();
  const paths = postListData.data.pageConnection
    .edges! // TODO(James) pull reading into [[...slug]]
    .filter(edge => {
      // Remove reading
      if (edge!.node!._sys.filename === 'reading') return false;
      // Keep home
      if (edge!.node!._sys.filename === HOME_SLUG) return true;
      // Remove all of the dunder pages
      return !edge!.node!._sys.filename.includes('__');
    })
    .map(edge => ({
      params: {
        // TODO(James) this isn't the correct slug; folder is missing
        slug: resolveSegments(edge!.node!._sys.filename),
      },
    }));

  return paths;
});

export const getWritingArchivePaths = cache(async () => {
  const response = await client.queries.getPostSlugs();
  const props = await getPagePropsBySlug('writing/__archive__');
  if (props.response.data.page.__typename === 'PagePostArchive') {
    const { perPage } = props.response.data.page;
    return generatePagesPaths(
      response.data.postConnection.edges!.length,
      perPage!,
    );
  }

  throw new Error(
    `Expected PostPageArchive, got ${props.response.data.page.__typename}`,
  );
});

export const getWritingPaths = cache(async () => {
  const response = await client.queries.getPostSlugs();
  const paths = response.data.postConnection.edges!.map(edge => ({
    params: {
      slug: edge!.node!._sys.filename,
    },
  }));
  return paths;
});

export const getGistpenPaths = cache(async () => {
  const repoListData = await client.queries.getRepoSlugs();
  const paths = repoListData.data.repoConnection.edges!.map(edge => ({
    params: {
      slug: edge!.node!._sys.filename,
    },
  }));
  return paths;
});

export const getTalkArchivePaths = cache(async () =>
  Object.keys(Prezis).map(slug => ({
    params: {
      slug: paramCase(slug),
    },
  })),
);

export const getGistpenArchivePaths = cache(async () => {
  const repoListData = await client.queries.getRepoSlugs();
  const props = await getPagePropsBySlug('gistpens/__archive__');
  const { perPage } = props.response.data.page;
  return generatePagesPaths(
    repoListData.data.repoConnection.edges!.length,
    perPage,
  );
});

export const getPagePropsBySlug = cache(async slug => {
  const response = await client.queries.getPageProps({
    relativePath: `${slug}.md`,
  });
  if (!response.data?.page) {
    throw new Error(`Failed to fetch ${slug} page props`);
  }

  return { response };
});

export const getPageProps = cache(async params =>
  getPagePropsBySlug(resolveSlug(params)),
);

/**
 * @param {{ source: string; altText:string }} media
 * @returns {Promise<import('react').ComponentProps<typeof import('next/image').default>>}
 */
const getImagePropsFromMedia = cache(
  async (media: {
    __typename?: 'Media';
    title: string;
    source: string;
    altText: string;
  }) => {
    const res = await fetch(media.source);
    const buffer = Buffer.from(await res.arrayBuffer());
    const {
      base64,
      metadata: { width, height },
    } = await getPlaiceholder(buffer);

    return {
      width,
      height,
      alt: media.altText ?? '',
      src: media.source,
      blurDataURL: base64,
      placeholder: base64 ? 'blur' : 'empty',
    };
  },
);

export const get404PageProps = cache(async () =>
  getPagePropsBySlug(FOUR_OH_FOUR_SLUG),
);

export const get500PageProps = cache(async () =>
  getPagePropsBySlug(FIVE_HUNDRED_SLUG),
);

export const getRepoBySlug = cache(async slug => {
  const response = await client.queries.getRepo({ relativePath: `${slug}.md` });
  if (!response.data?.repo) {
    throw new Error(`Failed to fetch ${slug} repo props`);
  }
  return response;
});

export const getPostBySlug = cache(async slug => {
  const response = await client.queries.getPost({ relativePath: `${slug}.md` });
  if (!response.data?.post) {
    throw new Error(`Failed to fetch ${slug} post props`);
  }
  return response;
});

const getReposByPage = cache(async (page, perPage) => {
  const response = await client.queries.getRepos();

  const startIndex = (page - 1) * perPage;
  const endIndex = page * perPage;

  response.data.repoConnection = {
    ...response.data.repoConnection,
    edges: response.data.repoConnection.edges!.slice(startIndex, endIndex),
    pageInfo: {
      hasNextPage: endIndex <= response.data.repoConnection.edges!.length,
      hasPreviousPage: startIndex >= 0,
    },
  };

  return response;
});

export const getGistpenArchiveProps = cache(async ({ page }) => {
  const props = await getPagePropsBySlug('gistpens/__archive__');
  const { perPage } = props.response.data.page;
  const repos = await getReposByPage(page, perPage);
  return { ...props, extra: { repos, page } };
});

export const getGistpenSingleProps = cache(async slug => {
  const props = await getPagePropsBySlug('gistpens/__single__');
  const repo = await getRepoBySlug(slug);
  return { ...props, extra: { repo } };
});

export const getReadingPageProps = cache(async () => {
  const props = await getPagePropsBySlug('reading');
  if (props.response.data.page.__typename === 'PageReadingList') {
    const reading = await getReadingProps(props.response.data.page.days);

    return { ...props, extra: { reading } };
  }

  throw new Error(
    `Expected PageReadingList, received ${props.response.data.page.__typename}`,
  );
});

export const getTalksArchivePageProps = cache(async () => {
  const props = await getPagePropsBySlug('talks/__archive__');

  return {
    ...props,
    extra: {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      talks: Object.entries(Prezis).map(([key, { component, ...talk }]) => ({
        ...talk,
        slug: paramCase(key),
      })),
    },
  };
});

const cachePath = path.join(process.cwd(), 'cache.json');

let writingPostsMem: Awaited<ReturnType<typeof client.queries.getWritingPosts>>;

const getWritingPosts = cache(async () => {
  if (!writingPostsMem) {
    if (
      await fs.stat(cachePath).then(
        () => true,
        () => false,
      )
    ) {
      writingPostsMem = JSON.parse(await fs.readFile(cachePath, 'utf-8'));
    } else {
      writingPostsMem = await client.queries.getWritingPosts();
      await fs.writeFile(cachePath, JSON.stringify(writingPostsMem));
    }
  }
  return writingPostsMem;
});

export const getWritingByPage = cache(async (page: number, perPage: number) => {
  const response = await getWritingPosts();

  const startIndex = (page - 1) * perPage;
  const endIndex = page * perPage;

  const edges = response.data.postConnection
    .edges!.filter(edge => edge!.node!.status === 'publish')
    .sort((a, b) =>
      compareDesc(
        parseISO(a!.node!.publishedAt!),
        parseISO(b!.node!.publishedAt!),
      ),
    );
  response.data.postConnection = {
    ...response.data.postConnection,
    edges: edges.slice(startIndex, endIndex),
    pageInfo: {
      hasNextPage: endIndex <= response.data.postConnection.edges!.length,
      hasPreviousPage: startIndex >= 0,
    },
  };

  return response;
});

export const getWritingSingleProps = cache(async slug => {
  const props = await getPagePropsBySlug('writing/__single__');
  const post = await getPostBySlug(slug);
  const { embeds, media } = await loadExtraFromPosts(post.data.post);
  return { ...props, extra: { post, embeds, media } };
});

export const getWritingArchiveProps = cache(async ({ page }) => {
  const props = await getPagePropsBySlug('writing/__archive__');
  if (props.response.data.page.__typename === 'PagePostArchive') {
    const posts = await getWritingByPage(
      page,
      props.response.data.page.perPage!,
    );
    const { embeds, media } = await loadExtraFromPosts(
      posts.data.postConnection.edges!.map(edge => edge!.node!),
    );

    return { ...props, extra: { posts, page, embeds, media } };
  }

  throw new Error(
    `Expected type PostPage Archive, receveid ${props.response.data.page.__typename}`,
  );
});
