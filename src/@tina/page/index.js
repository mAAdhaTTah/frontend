import { Single as PostSingle, Archive as PostArchive } from '@ui/post';
import { format, parseISO } from 'date-fns';
import { smartypantsu as smartypants } from 'smartypants';
import { Main } from '@ui/box';
import { Day, Gistpen, Pagination, Snippet } from '@ui/components';
import { PageLanding } from './landing';
import { PageFullScreen } from './fullScreen';
import { FootnoteProvider, Footnotes } from './footnotes';
import { RichText } from './RichText';

const gistpenMapper = node => ({
  createdAt: format(parseISO(node.createdAt), 'MMMM do, yyyy'),
  createdAtDatetime: node.createdAt,
  slug: node.slug,
  description: node.description,
  blobs: node.blobs.map(blob => ({
    code: blob.code,
    filename: blob.filename,
    language: blob.language,
  })),
});

const PageGistpenArchive = ({ extra: { repos, page } }) => {
  return (
    <Main>
      {repos.data.repoConnection.edges.map(({ node }) => (
        <Gistpen
          key={node._sys.filename}
          {...gistpenMapper(node)}
          slug={node._sys.filename}
          linkHeader
        />
      ))}
      <Pagination
        pageNumber={page}
        hasNextPage={repos.data.repoConnection.pageInfo.hasNextPage}
        slug="gistpens"
      />
    </Main>
  );
};

const PageGistpenSingle = ({ extra: { repo } }) => {
  return <Gistpen {...gistpenMapper(repo.data.repo)} />;
};

const PageReadingList = ({ extra }) => {
  return (
    <Main>
      {extra.reading.map(({ day, links }) => (
        <Day key={day} day={day} links={links} />
      ))}
    </Main>
  );
};

const bodyBlockMap = {
  PostStandardBodyRichText: ({ block, extra }) => (
    <RichText content={block.content} extra={extra} />
  ),
  PostGalleryBodyRichText: ({ block, extra }) => (
    <RichText content={block.content} extra={extra} />
  ),
  PostLinkBodyRichText: ({ block, extra }) => (
    <RichText content={block.content} extra={extra} />
  ),
  PostStatusBodyRichText: ({ block, extra }) => (
    <RichText content={block.content} extra={extra} />
  ),
  PostImageBodyRichText: ({ block, extra }) => (
    <RichText content={block.content} extra={extra} />
  ),
  PostAudioBodyRichText: ({ block, extra }) => (
    <RichText content={block.content} extra={extra} />
  ),
  PostVideoBodyRichText: ({ block, extra }) => (
    <RichText content={block.content} extra={extra} />
  ),
  PostQuoteBodyRichText: ({ block, extra }) => (
    <RichText content={block.content} extra={extra} />
  ),
  PostStandardBodyGistpenEmbed: ({ block }) => {
    const blob = block.repo.blobs.find(blob => blob.filename === block.blob);
    return (
      <div className="mb-5">
        <Snippet
          code={blob.code}
          filename={blob.filename}
          language={blob.language}
        />
      </div>
    );
  },
};

const PostBodyBlock = ({ block, extra }) => {
  const Component = bodyBlockMap[block.__typename];
  if (!Component)
    throw new Error(`Unhandled ${block.__typename} in post block`);
  return <Component block={block} extra={extra} />;
};

const PostBody = ({ body, extra }) => {
  return (
    <FootnoteProvider>
      <section className="max-w-prose">
        {body.map((block, i) => (
          <PostBodyBlock key={i} block={block} extra={extra} />
        ))}
      </section>
      <Footnotes />
    </FootnoteProvider>
  );
};

const nodeToCommonExcerptProps = node => ({
  id: node.id,
  author: { name: 'James DiGioia' },
  date: format(parseISO(node.publishedAt), 'MMMM do, yyyy'),
  dateTime: node.publishedAt,
});

const extractOembed = (url, embeds) => {
  const oembed = {
    url,
    html: null,
    aspectRatio: null,
  };
  const embed = embeds[url];

  if (embed) {
    oembed.html = embed.html;
    // .replace(/width="[\d]+"+/, 'width="100%"')
    // .replace(/height="[\d]+"+/, 'height="100%"');
    // if (embed.height && embed.width) {
    //   oembed.aspectRatio = embed.height / embed.width;
    // }
  }
  return oembed;
};

const nodeToExcerptMapper = {
  PostAudio: (node, extra) => ({
    format: 'audio',
    ...nodeToCommonExcerptProps(node),
    title: smartypants(node.title),
    content: <PostBody body={node.body} extra={extra} />,
    oembed: extractOembed(node.audio.url, extra.embeds),
  }),
  PostGallery: (node, extra) => ({
    format: 'gallery',
    ...nodeToCommonExcerptProps(node),
    title: smartypants(node.title),
    content: <PostBody body={node.body} extra={extra} />,
    images: node.images.map(({ reference }) => extra.media[reference.source]),
  }),
  PostImage: (node, extra) => ({
    format: 'image',
    ...nodeToCommonExcerptProps(node),
    title: smartypants(node.title),
    content: <PostBody body={node.body} extra={extra} />,
    media: extra.media[node.featuredMedia.source],
  }),
  PostLink: (node, extra) => ({
    format: 'link',
    ...nodeToCommonExcerptProps(node),
    title: smartypants(node.title),
    content: <PostBody body={node.body} extra={extra} />,
    linkUrl: node.link.url,
  }),
  PostQuote: (node, extra) => ({
    format: 'quote',
    ...nodeToCommonExcerptProps(node),
    source: node.source,
    content: <PostBody body={node.body} extra={extra} />,
  }),
  PostStatus: (node, extra) => ({
    format: 'status',
    ...nodeToCommonExcerptProps(node),
    content: <PostBody body={node.body} extra={extra} />,
  }),
  PostAside: (node, extra) => ({
    format: 'aside', // TODO
    ...nodeToCommonExcerptProps(node),
  }),
  PostVideo: (node, extra) => ({
    format: 'video',
    ...nodeToCommonExcerptProps(node),
    title: smartypants(node.title),
    content: <PostBody body={node.body} extra={extra} />,
    oembed: extractOembed(node.video.url, extra.embeds),
  }),
  PostStandard: (node, extra) => ({
    ...nodeToCommonExcerptProps(node),
    format: 'standard',
    title: smartypants(node.title),
    slug: node._sys.filename,
    excerpt: <RichText content={node.excerpt} extra={extra} />,
  }),
};

const nodeToSingleMapper = {
  PostAudio: nodeToExcerptMapper.PostAudio,
  PostGallery: nodeToExcerptMapper.PostGallery,
  PostImage: nodeToExcerptMapper.PostImage,
  PostLink: nodeToExcerptMapper.PostLink,
  PostQuote: nodeToExcerptMapper.PostQuote,
  PostStatus: nodeToExcerptMapper.PostStatus,
  PostAside: nodeToExcerptMapper.PostAside,
  PostVideo: nodeToExcerptMapper.PostVideo,
  PostStandard: (node, extra) => ({
    ...nodeToCommonExcerptProps(node),
    title: smartypants(node.title),
    format: 'standard',
    slug: node._sys.filename,
    media: node.featuredMedia ? extra.media[node.featuredMedia.source] : null,
    content: <PostBody body={node.body} extra={extra} />,
  }),
};

const nodeToProps = (node, extra, mapper) =>
  mapper[node.__typename](node, extra);

const PagePostArchive = ({ extra: { posts, ...extra } }) => {
  return (
    <PostArchive
      excerpts={posts.data.postConnection.edges.map(({ node }) =>
        nodeToProps(node, extra, nodeToExcerptMapper),
      )}
      pageNumber={extra.page}
      hasNextPage={posts.data.postConnection.pageInfo.hasNextPage}
    />
  );
};

const PagePostSingle = ({ extra: { post, ...extra } }) => {
  return (
    <PostSingle post={nodeToProps(post.data.post, extra, nodeToSingleMapper)} />
  );
};

const templates = {
  PageLanding,
  PageFullScreen,
  PageGistpenArchive,
  PageGistpenSingle,
  PagePostArchive,
  PagePostSingle,
  PageReadingList,
};

const UnknownTypeName = ({ typeName }) => <div>Unknown type {typeName}</div>;

export const TinaPage = ({ response, extra }) => {
  const typeName = response.data.page.__typename;
  const Template = templates[typeName];

  if (!Template) return <UnknownTypeName typeName={typeName} />;
  return <Template data={response.data} extra={extra} />;
};
