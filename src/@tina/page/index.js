import { createContext, useContext, useRef } from 'react';
import { Single as PostSingle, Archive as PostArchive } from '@ui/post';
import { useTina } from 'tinacms/dist/react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import { format, parseISO } from 'date-fns';
import { smartypantsu as smartypants } from 'smartypants';
import { Main } from '@ui/box';
import { SEO } from '@ui/seo';
import { Day, Embed, Gistpen, Pagination, Snippet } from '@ui/components';
import { Code, Heading, Link, Paragraph, Sup } from '@ui/typography';
import { Li, Ol, Ul } from '@ui/atoms';
import { PageLanding } from './landing';
import { PageFullScreen } from './fullScreen';

const FootnoteContext = createContext([]);

const Footnotes = () => {
  const footnotes = useContext(FootnoteContext);
  if (!footnotes.length) return null;
  return (
    <>
      <hr />
      <Ol>
        {footnotes.map(({ id, content }) => (
          <Li key={id} id={`fn:${id}`}>
            {content}
          </Li>
        ))}
      </Ol>
    </>
  );
};

const FootnoteProvider = ({ children }) => {
  const footnotes = [];
  return (
    <FootnoteContext.Provider value={footnotes}>
      {children}
    </FootnoteContext.Provider>
  );
};

const useDefineFootnote = (id, content) => {
  const footnotes = useContext(FootnoteContext);
  const textReference = useRef(content);
  const indexReference = useRef(-1);

  if (indexReference.current === -1) {
    indexReference.current = footnotes.push({ id, content }) - 1;
  } else if (textReference.current !== content) {
    textReference.current = footnotes[indexReference.current] = { id, content };
  }
};

const RichText = ({ content, extra, components = {} }) => {
  return (
    <TinaMarkdown
      content={content}
      components={{
        p: Paragraph,
        code: Code,
        a: props => <Link href={props.url}>{props.children}</Link>,
        img: ({ url, alt }) => (
          <Paragraph>
            <img src={url} alt={smartypants(alt)} />
          </Paragraph>
        ),
        // TODO readd
        // h1: props => (
        //   <Heading level={1} variant="h-1">
        //     {props.children}
        //   </Heading>
        // ),
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
        ExtendedQuote: ({ children }) => (
          <blockquote>
            <RichText content={children} extra={extra} />
          </blockquote>
        ), // TODO style
        Embed: ({ url, provider }) => (
          <Embed html={extra.embeds[url]?.html} url={url} provider={provider} />
        ),
        Figure: props => (
          <figure>
            <img src={props.url} alt={props.altText} />
            <figcaption>{props.caption}</figcaption>
          </figure>
        ),
        FootnoteReference: ({ id }) => {
          return (
            <Sup id={`fnref:${id}`}>
              <Link href={`#fn:${id}`}>{id}</Link>
            </Sup>
          );
        },
        FootnoteDefinition: ({ id, children }) => {
          useDefineFootnote(
            id,
            <RichText
              content={children}
              extra={extra}
              components={{
                p: ({ children }) => (
                  <Paragraph>
                    {children}&nbsp;<Link href={`#fnref:${id}`}>↩</Link>
                  </Paragraph>
                ),
              }}
            />,
          );
          return null;
        },
        ...components,
      }}
    />
  );
};

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

const PageGistpenArchive = ({ extra }) => {
  const sync = useTina(extra.repos);
  return (
    <SEO>
      <Main>
        {sync.data.repoConnection.edges.map(({ node }) => (
          <Gistpen
            key={node.id}
            {...gistpenMapper(node)}
            slug={node._sys.filename}
            linkHeader
          />
        ))}
        <Pagination
          pageNumber={extra.page}
          hasNextPage={sync.data.repoConnection.pageInfo.hasNextPage}
          slug="gistpens"
        />
      </Main>
    </SEO>
  );
};

const PageGistpenSingle = ({ extra }) => {
  const sync = useTina(extra.repo);
  return (
    <SEO>
      <Gistpen {...gistpenMapper(sync.data.repo)} />
    </SEO>
  );
};

const PageReadingList = ({ extra }) => {
  return (
    <SEO>
      <Main>
        {extra.reading.map(({ day, links }) => (
          <Day key={day} day={day} links={links} />
        ))}
      </Main>
    </SEO>
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
        {body.map(block => (
          <PostBodyBlock block={block} extra={extra} />
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
    images: node.images.map(({ reference }) => ({
      url: reference.source,
      alt: reference.altText,
    })),
  }),
  PostImage: (node, extra) => ({
    format: 'image',
    ...nodeToCommonExcerptProps(node),
    title: smartypants(node.title),
    content: <PostBody body={node.body} extra={extra} />,
    media: {
      url: node.featuredMedia.source,
      alt: node.featuredMedia.altText,
    },
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
    media: node.featuredMedia
      ? {
          url: node.featuredMedia.source,
          alt: node.featuredMedia.altText,
        }
      : null,
    content: <PostBody body={node.body} extra={extra} />,
  }),
};

const nodeToProps = (node, extra, mapper) =>
  mapper[node.__typename](node, extra);

const PagePostArchive = ({ extra: { posts, ...extra } }) => {
  const sync = useTina(posts);
  return (
    <SEO>
      <PostArchive
        excerpts={sync.data.postConnection.edges.map(({ node }) =>
          nodeToProps(node, extra, nodeToExcerptMapper),
        )}
        pageNumber={extra.page}
        hasNextPage={sync.data.postConnection.pageInfo.hasNextPage}
      />
    </SEO>
  );
};

const PagePostSingle = ({ extra: { post, ...extra } }) => {
  const sync = useTina(post);
  return (
    <SEO title={sync.data.post.title}>
      <PostSingle
        post={nodeToProps(sync.data.post, extra, nodeToSingleMapper)}
      />
    </SEO>
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
  const sync = useTina(response);
  const typeName = sync.data.page.__typename;
  const Template = templates[typeName];

  if (!Template) return <UnknownTypeName typeName={typeName} />;
  return <Template data={sync.data} extra={extra} />;
};
