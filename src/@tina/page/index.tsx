'use client';
import { createContext, useContext, useRef } from 'react';
import { Single as PostSingle, Archive as PostArchive } from '@ui/post';
import { useTina } from 'tinacms/dist/react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import { format, parseISO } from 'date-fns';
// @ts-expect-error TS(7016) FIXME: Could not find a declaration file for module 'smar... Remove this comment to see the full error message
import { smartypantsu as smartypants } from 'smartypants';
import Image from 'next/image';
import { Main } from '@ui/box';
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

const FootnoteProvider = ({ children }: any) => {
  const footnotes: any = [];
  return (
    <FootnoteContext.Provider value={footnotes}>
      {children}
    </FootnoteContext.Provider>
  );
};

const useDefineFootnote = (id: any, content: any) => {
  const footnotes = useContext(FootnoteContext);
  const textReference = useRef(content);
  const indexReference = useRef(-1);

  if (indexReference.current === -1) {
    // @ts-expect-error TS(2322) FIXME: Type 'any' is not assignable to type 'never'.
    indexReference.current = footnotes.push({ id, content }) - 1;
  } else if (textReference.current !== content) {
    // @ts-expect-error TS(2322) FIXME: Type 'any' is not assignable to type 'never'.
    textReference.current = footnotes[indexReference.current] = { id, content };
  }
};

const RichText = ({ content, extra, components = {} }: any) => {
  return (
    <TinaMarkdown
      content={content}
      components={{
        p: Paragraph,
        code: Code,
        // @ts-expect-error TS(2532) FIXME: Object is possibly 'undefined'.
        a: props => <Link href={props.url}>{props.children}</Link>,
        // @ts-expect-error TS(2339) FIXME: Property 'url' does not exist on type '{ url: stri... Remove this comment to see the full error message
        img: ({ url }) => <Image {...extra.media[url]} />,
        h1: props => (
          <Heading level={1} variant="h-1">
            {/** @ts-expect-error TS(2532) FIXME: Object is possibly 'undefined'. */}
            {props.children}
          </Heading>
        ),
        h2: props => (
          <Heading level={2} variant="h-2">
            {/** @ts-expect-error TS(2532) FIXME: Object is possibly 'undefined'. */}
            {props.children}
          </Heading>
        ),
        h3: props => (
          <Heading level={3} variant="h-3">
            {/** @ts-expect-error TS(2532) FIXME: Object is possibly 'undefined'. */}
            {props.children}
          </Heading>
        ),
        h4: props => (
          <Heading level={4} variant="h-4">
            {/** @ts-expect-error TS(2532) FIXME: Object is possibly 'undefined'. */}
            {props.children}
          </Heading>
        ),
        // @ts-expect-error TS(2532) FIXME: Object is possibly 'undefined'.
        ol: props => <Ol>{props.children}</Ol>,
        // @ts-expect-error TS(2532) FIXME: Object is possibly 'undefined'.
        ul: props => <Ul>{props.children}</Ul>,
        // @ts-expect-error TS(2532) FIXME: Object is possibly 'undefined'.
        li: props => <Li>{props.children}</Li>,
        // @ts-expect-error TS(2532) FIXME: Object is possibly 'undefined'.
        lic: props => <Paragraph>{props.children}</Paragraph>,
        // @ts-expect-error TS(2532) FIXME: Object is possibly 'undefined'.
        text: props => <>{smartypants(props.children, '2')}</>,
        code_block: props => (
          // @ts-expect-error TS(2532) FIXME: Object is possibly 'undefined'.
          <Snippet language={props.lang || 'plaintext'} code={props.value} />
        ),
        ExtendedQuote: props => (
          <blockquote>
            {/** @ts-expect-error TS(2532) FIXME: Object is possibly 'undefined'. */}
            <RichText content={props.children} extra={extra} />
          </blockquote>
        ), // TODO style
        // @ts-expect-error TS(2339) FIXME: Property 'url' does not exist on type '(props: any... Remove this comment to see the full error message
        Embed: ({ url, provider }) => (
          <Embed html={extra.embeds[url]?.html} url={url} provider={provider} />
        ),
        // @ts-expect-error TS(2339) FIXME: Property 'url' does not exist on type '(props: any... Remove this comment to see the full error message
        Figure: ({ url, caption }) => (
          <figure>
            <Image {...extra.media[url]} />
            <figcaption>{caption}</figcaption>
          </figure>
        ),
        // @ts-expect-error TS(2339) FIXME: Property 'id' does not exist on type '(props: any)... Remove this comment to see the full error message
        FootnoteReference: ({ id }) => {
          return (
            <Sup id={`fnref:${id}`}>
              <Link href={`#fn:${id}`}>{id}</Link>
            </Sup>
          );
        },
        // @ts-expect-error TS(2339) FIXME: Property 'id' does not exist on type '(props: any)... Remove this comment to see the full error message
        FootnoteDefinition: ({ id, children }) => {
          useDefineFootnote(
            id,
            <RichText
              content={children}
              extra={extra}
              components={{
                p: ({ children }: any) => (
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

const gistpenMapper = (node: any) => ({
  createdAt: format(parseISO(node.createdAt), 'MMMM do, yyyy'),
  createdAtDatetime: node.createdAt,
  slug: node.slug,
  description: node.description,

  blobs: node.blobs.map((blob: any) => ({
    code: blob.code,
    filename: blob.filename,
    language: blob.language,
  })),
});

const PageGistpenArchive = ({ extra }: any) => {
  const sync = useTina(extra.repos);
  return (
    <Main>
      {/* @ts-expect-error TS(2339) FIXME: Property 'repoConnection' does not exist on type '... Remove this comment to see the full error message */}
      {sync.data.repoConnection.edges.map(({ node }: any) => (
        <Gistpen
          key={node._sys.filename}
          {...gistpenMapper(node)}
          slug={node._sys.filename}
          linkHeader
        />
      ))}
      <Pagination
        pageNumber={extra.page}
        // @ts-expect-error TS(2339) FIXME: Property 'repoConnection' does not exist on type '... Remove this comment to see the full error message
        hasNextPage={sync.data.repoConnection.pageInfo.hasNextPage}
        slug="gistpens"
      />
    </Main>
  );
};

const PageGistpenSingle = ({ extra }: any) => {
  const sync = useTina(extra.repo);
  // @ts-expect-error TS(2339) FIXME: Property 'repo' does not exist on type 'object'.
  return <Gistpen {...gistpenMapper(sync.data.repo)} />;
};

const PageReadingList = ({ extra }: any) => {
  return (
    <Main>
      {extra.reading.map(({ day, links }: any) => (
        <Day key={day} day={day} links={links} />
      ))}
    </Main>
  );
};

const bodyBlockMap = {
  PostStandardBodyRichText: ({ block, extra }: any) => (
    <RichText content={block.content} extra={extra} />
  ),
  PostGalleryBodyRichText: ({ block, extra }: any) => (
    <RichText content={block.content} extra={extra} />
  ),
  PostLinkBodyRichText: ({ block, extra }: any) => (
    <RichText content={block.content} extra={extra} />
  ),
  PostStatusBodyRichText: ({ block, extra }: any) => (
    <RichText content={block.content} extra={extra} />
  ),
  PostImageBodyRichText: ({ block, extra }: any) => (
    <RichText content={block.content} extra={extra} />
  ),
  PostAudioBodyRichText: ({ block, extra }: any) => (
    <RichText content={block.content} extra={extra} />
  ),
  PostVideoBodyRichText: ({ block, extra }: any) => (
    <RichText content={block.content} extra={extra} />
  ),
  PostQuoteBodyRichText: ({ block, extra }: any) => (
    <RichText content={block.content} extra={extra} />
  ),
  PostStandardBodyGistpenEmbed: ({ block }: any) => {
    const blob = block.repo.blobs.find(
      (blob: any) => blob.filename === block.blob,
    );
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

const PostBodyBlock = ({ block, extra }: any) => {
  // @ts-expect-error TS(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  const Component = bodyBlockMap[block.__typename];
  if (!Component)
    throw new Error(`Unhandled ${block.__typename} in post block`);
  return <Component block={block} extra={extra} />;
};

const PostBody = ({ body, extra }: any) => {
  return (
    <FootnoteProvider>
      <section className="max-w-prose">
        {body.map((block: any, i: any) => (
          <PostBodyBlock key={i} block={block} extra={extra} />
        ))}
      </section>
      <Footnotes />
    </FootnoteProvider>
  );
};

const nodeToCommonExcerptProps = (node: any) => ({
  id: node.id,
  author: { name: 'James DiGioia' },
  date: format(parseISO(node.publishedAt), 'MMMM do, yyyy'),
  dateTime: node.publishedAt,
});

const extractOembed = (url: any, embeds: any) => {
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
  // @ts-expect-error TS(7006) FIXME: Parameter 'node' implicitly has an 'any' type.
  PostAudio: (node, extra) => ({
    format: 'audio',
    ...nodeToCommonExcerptProps(node),
    title: smartypants(node.title),
    content: <PostBody body={node.body} extra={extra} />,
    oembed: extractOembed(node.audio.url, extra.embeds),
  }),
  // @ts-expect-error TS(7006) FIXME: Parameter 'node' implicitly has an 'any' type.
  PostGallery: (node, extra) => ({
    format: 'gallery',
    ...nodeToCommonExcerptProps(node),
    title: smartypants(node.title),
    content: <PostBody body={node.body} extra={extra} />,

    images: node.images.map(
      ({ reference }: any) => extra.media[reference.source],
    ),
  }),
  // @ts-expect-error TS(7006) FIXME: Parameter 'node' implicitly has an 'any' type.
  PostImage: (node, extra) => ({
    format: 'image',
    ...nodeToCommonExcerptProps(node),
    title: smartypants(node.title),
    content: <PostBody body={node.body} extra={extra} />,
    media: extra.media[node.featuredMedia.source],
  }),
  // @ts-expect-error TS(7006) FIXME: Parameter 'node' implicitly has an 'any' type.
  PostLink: (node, extra) => ({
    format: 'link',
    ...nodeToCommonExcerptProps(node),
    title: smartypants(node.title),
    content: <PostBody body={node.body} extra={extra} />,
    linkUrl: node.link.url,
  }),
  // @ts-expect-error TS(7006) FIXME: Parameter 'node' implicitly has an 'any' type.
  PostQuote: (node, extra) => ({
    format: 'quote',
    ...nodeToCommonExcerptProps(node),
    source: node.source,
    content: <PostBody body={node.body} extra={extra} />,
  }),
  // @ts-expect-error TS(7006) FIXME: Parameter 'node' implicitly has an 'any' type.
  PostStatus: (node, extra) => ({
    format: 'status',
    ...nodeToCommonExcerptProps(node),
    content: <PostBody body={node.body} extra={extra} />,
  }),
  // @ts-expect-error TS(7006) FIXME: Parameter 'node' implicitly has an 'any' type.
  PostAside: (node, extra) => ({
    // TODO
    format: 'aside',

    ...nodeToCommonExcerptProps(node),
  }),
  // @ts-expect-error TS(7006) FIXME: Parameter 'node' implicitly has an 'any' type.
  PostVideo: (node, extra) => ({
    format: 'video',
    ...nodeToCommonExcerptProps(node),
    title: smartypants(node.title),
    content: <PostBody body={node.body} extra={extra} />,
    oembed: extractOembed(node.video.url, extra.embeds),
  }),
  // @ts-expect-error TS(7006) FIXME: Parameter 'node' implicitly has an 'any' type.
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
  // @ts-expect-error TS(7006) FIXME: Parameter 'node' implicitly has an 'any' type.
  PostStandard: (node, extra) => ({
    ...nodeToCommonExcerptProps(node),
    title: smartypants(node.title),
    format: 'standard',
    slug: node._sys.filename,
    media: node.featuredMedia ? extra.media[node.featuredMedia.source] : null,
    content: <PostBody body={node.body} extra={extra} />,
  }),
};

const nodeToProps = (node: any, extra: any, mapper: any) =>
  mapper[node.__typename](node, extra);

const PagePostArchive = ({ extra: { posts, ...extra } }: any) => {
  const sync = useTina(posts);
  return (
    <PostArchive
      // @ts-expect-error TS(2339) FIXME: Property 'postConnection' does not exist on type '... Remove this comment to see the full error message
      excerpts={sync.data.postConnection.edges.map(({ node }: any) =>
        nodeToProps(node, extra, nodeToExcerptMapper),
      )}
      pageNumber={extra.page}
      // @ts-expect-error TS(2339) FIXME: Property 'postConnection' does not exist on type '... Remove this comment to see the full error message
      hasNextPage={sync.data.postConnection.pageInfo.hasNextPage}
    />
  );
};

const PagePostSingle = ({ extra: { post, ...extra } }: any) => {
  const sync = useTina(post);
  return (
    // @ts-expect-error TS(2339) FIXME: Property 'post' does not exist on type 'object'.
    <PostSingle post={nodeToProps(sync.data.post, extra, nodeToSingleMapper)} />
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

const UnknownTypeName = ({ typeName }: any) => (
  <div>Unknown type {typeName}</div>
);

export const TinaPage = ({ response, extra }: any) => {
  const sync = useTina(response);
  // @ts-expect-error TS(2339) FIXME: Property 'page' does not exist on type 'object'.
  const typeName = sync.data.page.__typename;
  // @ts-expect-error TS(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  const Template = templates[typeName];

  if (!Template) return <UnknownTypeName typeName={typeName} />;
  return <Template data={sync.data} extra={extra} />;
};
