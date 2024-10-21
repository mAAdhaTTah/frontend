import 'server-only';
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
import { paramCase } from 'param-case';
import { getPlaiceholder } from 'plaiceholder';
import * as Prezis from '@talks/prezis';
import { client } from '../../tina/__generated__/client';

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
      links: menu.items.map(item => ({
        text: item.text,
        to: item.href,
      })),
    },
  };
});

const loadExtraFromPosts = cache(async posts => {
  if (!Array.isArray(posts)) {
    posts = [posts];
  }

  const embeds = {},
    media = {};
  const loadEmbed = async url => {
    try {
      embeds[url] = await extract(url);
    } catch {}
  };
  const loadMedia = async m => {
    try {
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
        promises.push(loadEmbed(post.video.url));
        break;
      case 'PostAudio':
        promises.push(loadEmbed(post.audio.url));
        break;
      case 'PostImage':
      case 'PostStandard':
        if (post.featuredMedia) {
          await loadMedia(post.featuredMedia);
        }
        break;
      case 'PostGallery':
        for (const { reference: media } of post.images) {
          promises.push(loadMedia(media));
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
});

const generatePagesPaths = (count, perPage) => {
  const numPages = Math.ceil(count / perPage) - 2;

  return [...Array(numPages).fill(2)].map((num, idx) => ({
    params: { number: String(num + idx) },
  }));
};

export const getPagePaths = cache(async () => {
  const postListData = await client.queries.getPageSlugs();
  const paths = postListData.data.pageConnection.edges
    // TODO(James) pull reading into [[...slug]]
    .filter(edge => {
      // Remove reading
      if (edge.node._sys.filename === 'reading') return false;
      // Keep home
      if (edge.node._sys.filename === HOME_SLUG) return true;
      // Remove all of the dunder pages
      return !edge.node._sys.filename.includes('__');
    })
    .map(edge => ({
      params: {
        // TODO(James) this isn't the correct slug; folder is missing
        slug: resolveSegments(edge.node._sys.filename),
      },
    }));

  return paths;
});

export const getWritingArchivePaths = cache(async () => {
  const response = await client.queries.getPostSlugs();
  const props = await getPagePropsBySlug('writing/__archive__');
  const { perPage } = props.response.data.page;
  return generatePagesPaths(response.data.postConnection.edges.length, perPage);
});

export const getWritingPaths = cache(async () => {
  const response = await client.queries.getPostSlugs();
  const paths = response.data.postConnection.edges.map(edge => ({
    params: {
      slug: edge.node._sys.filename,
    },
  }));
  return paths;
});

export const getGistpenPaths = cache(async () => {
  const repoListData = await client.queries.getRepoSlugs();
  const paths = repoListData.data.repoConnection.edges.map(edge => ({
    params: {
      slug: edge.node._sys.filename,
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
    repoListData.data.repoConnection.edges.length,
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
const getImagePropsFromMedia = cache(async media => {
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
});

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
    edges: response.data.repoConnection.edges.slice(startIndex, endIndex),
    pageInfo: {
      hasNextPage: endIndex <= response.data.repoConnection.edges.length,
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
  const reading = await getReadingProps(props.response.data.page.days);

  return { ...props, extra: { reading } };
});

export const getTalksArchivePageProps = cache(async () => {
  const props = await getPagePropsBySlug('talks/__archive__');

  return {
    ...props,
    extra: {
      talks: Object.entries(Prezis).map(([key, { component, ...talk }]) => ({
        ...talk,
        slug: paramCase(key),
      })),
    },
  };
});

const getWritingPosts = cache(async () => {
  const response = await client.queries.getWritingPosts();
  return response;
});

export const getWritingByPage = cache(async (page, perPage) => {
  const response = await getWritingPosts();

  const startIndex = (page - 1) * perPage;
  const endIndex = page * perPage;

  const edges = response.data.postConnection.edges
    .filter(({ node }) => node.status === 'publish')
    .sort((a, b) =>
      compareDesc(parseISO(a.node.publishedAt), parseISO(b.node.publishedAt)),
    );
  response.data.postConnection = {
    ...response.data.postConnection,
    edges: edges.slice(startIndex, endIndex),
    pageInfo: {
      hasNextPage: endIndex <= response.data.postConnection.edges.length,
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
  const posts = await getWritingByPage(page, props.response.data.page.perPage);
  const { embeds, media } = await loadExtraFromPosts(
    posts.data.postConnection.edges.map(({ node }) => node),
  );

  return { ...props, extra: { posts, page, embeds, media } };
});
