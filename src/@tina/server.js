// import { extract } from '@extractus/oembed-extractor';
import { wp } from '@wp/api/wp';
import { getReadingProps } from '@reading/server';
import {
  FIVE_HUNDRED_SLUG,
  FOUR_OH_FOUR_SLUG,
  resolveSegments,
  resolveSlug,
} from '@tina/routes';
import { avatarImage, backgroundImage } from '@ui/components/images';
import { compareDesc, parseISO } from 'date-fns';
import { client } from '../../.tina/__generated__/client';

const extractEmbeds = async posts => {
  if (!Array.isArray(posts)) {
    posts = [posts];
  }

  const embeds = {};
  const createEmbed = async url => {
    try {
      // TODO swap back to `extract`
      embeds[url] = (
        await wp.get(`/wp-json/oembed/1.0/proxy?url=${encodeURIComponent(url)}`)
      ).data;
    } catch {}
  };
  for (const post of posts) {
    switch (post.__typename) {
      case 'PostVideo':
        await createEmbed(post.video.url);
        break;
      case 'PostAudio':
        await createEmbed(post.audio.url);
        break;
      // no default
    }

    if (Array.isArray(post.body)) {
      for (const block of post.body) {
        switch (block.__typename) {
          case 'PostStandardBodyRichText':
          case 'PostGalleryBodyRichText':
          case 'PostLinkBodyRichText':
          case 'PostStatusBodyRichText':
          case 'PostImageBodyRichText':
          case 'PostAudioBodyRichText':
          case 'PostVideoBodyRichText':
          case 'PostQuoteBodyRichText':
            for (const element of block.content.children) {
              if (element.name === 'Embed') {
                await createEmbed(element.props.url);
              }
            }
            break;
          // no default
        }
      }
    }
  }

  return embeds;
};

const generatePagesPaths = (count, perPage) => {
  const numPages = Math.ceil(count / perPage) - 1;

  return [...Array(numPages).fill(2)].map((num, idx) => ({
    params: { number: String(num + idx) },
  }));
};

export const getPagePaths = async () => {
  const postListData = await client.queries.getPageSlugs();
  const paths = postListData.data.pageConnection.edges
    // TODO(James) pull reading into [[...slug]]
    .filter(
      edge =>
        edge.node._sys.filename !== 'reading' &&
        !edge.node._sys.filename.includes('__'),
    )
    .map(edge => ({
      params: {
        // TODO(James) this isn't the correct slug; folder is missing
        slug: resolveSegments(edge.node._sys.filename),
      },
    }));

  return paths;
};

export const getWritingArchivePaths = async () => {
  const response = await client.queries.getPostSlugs();
  const props = await getPagePropsBySlug('writing/__archive__');
  const { perPage } = props.response.data.page;
  return generatePagesPaths(response.data.postConnection.edges.length, perPage);
};

export const getWritingPaths = async () => {
  const response = await client.queries.getPostSlugs();
  const paths = response.data.postConnection.edges.map(edge => ({
    params: {
      slug: edge.node._sys.filename,
    },
  }));
  return paths;
};

export const getGistpenPaths = async () => {
  const repoListData = await client.queries.getRepoSlugs();
  const paths = repoListData.data.repoConnection.edges.map(edge => ({
    params: {
      slug: edge.node._sys.filename,
    },
  }));
  return paths;
};

export const getGistpenArchivePaths = async () => {
  const repoListData = await client.queries.getRepoSlugs();
  const props = await getPagePropsBySlug('gistpens/__archive__');
  const { perPage } = props.response.data.page;
  return generatePagesPaths(
    repoListData.data.repoConnection.edges.length,
    perPage,
  );
};

const getPagePropsBySlug = async slug => {
  const response = await client.queries.getPageProps({
    relativePath: `${slug}.md`,
  });
  if (!response.data?.page) {
    throw new Error(`Failed to fetch ${slug} page props`);
  }

  return {
    response: response,
    layout: getPageLayoutProps(response.data.page),
  };
};

export const getPageProps = async params =>
  getPagePropsBySlug(resolveSlug(params));

export const getPageLayoutProps = page => ({
  header: {
    title: page.header.title,
    description: page.header.description,
    links: page.menu.items.map(item => ({
      text: item.text,
      to: item.href,
    })),
    backgroundImage: page.header.background || backgroundImage,
    avatarImage: page.header.avatar || avatarImage,
    fullScreen: page.__typename === 'PageFullScreen',
  },
});

export const get404PageProps = async () =>
  getPagePropsBySlug(FOUR_OH_FOUR_SLUG);

export const get500PageProps = async () =>
  getPagePropsBySlug(FIVE_HUNDRED_SLUG);

export const getRepoBySlug = async slug => {
  const response = await client.queries.getRepo({ relativePath: `${slug}.md` });
  if (!response.data?.repo) {
    throw new Error(`Failed to fetch ${slug} repo props`);
  }
  return response;
};

export const getPostBySlug = async slug => {
  const response = await client.queries.getPost({ relativePath: `${slug}.md` });
  if (!response.data?.post) {
    throw new Error(`Failed to fetch ${slug} post props`);
  }
  return response;
};

const getReposByPage = async (page, perPage) => {
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
};

export const getGistpenArchiveProps = async ({ page }) => {
  const props = await getPagePropsBySlug('gistpens/__archive__');
  const { perPage } = props.response.data.page;
  const repos = await getReposByPage(page, perPage);
  return { ...props, extra: { repos, page } };
};

export const getGistpenSingleProps = async slug => {
  const props = await getPagePropsBySlug('gistpens/__single__');
  const repo = await getRepoBySlug(slug);
  return { ...props, extra: { repo } };
};

export const getReadingPageProps = async () => {
  const props = await getPagePropsBySlug('reading');
  const reading = await getReadingProps(props.response.data.page.days);

  return { ...props, extra: { reading } };
};

export const getWritingByPage = async (page, perPage) => {
  const response = await client.queries.getWritingPosts();

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
};

export const getWritingSingleProps = async slug => {
  const props = await getPagePropsBySlug('writing/__single__');
  const post = await getPostBySlug(slug);
  const embeds = await extractEmbeds(post.data.post);
  return { ...props, extra: { post, embeds } };
};

export const getWritingArchiveProps = async ({ page }) => {
  const props = await getPagePropsBySlug('writing/__archive__');
  const posts = await getWritingByPage(page, props.response.data.page.perPage);
  const embeds = await extractEmbeds(
    posts.data.postConnection.edges.map(({ node }) => node),
  );

  return { ...props, extra: { posts, page, embeds } };
};
