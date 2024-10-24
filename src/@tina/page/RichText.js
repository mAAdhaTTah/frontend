import { TinaMarkdown } from 'tinacms/dist/rich-text';
import { smartypantsu as smartypants } from 'smartypants';
import Image from 'next/image';
import { Embed, Snippet } from '@ui/components';
import { Code, Heading, Link, Paragraph, Sup } from '@ui/typography';
import { Li, Ol, Ul } from '@ui/atoms';
import { FootnoteDef } from './footnotes';

export const RichText = ({ content, extra, components = {} }) => {
  return (
    <TinaMarkdown
      content={content}
      components={{
        p: Paragraph,
        code: Code,
        a: props => <Link href={props.url}>{props.children}</Link>,
        img: ({ url }) => <Image {...extra.media[url]} />,
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
        ExtendedQuote: ({ children }) => (
          <blockquote>
            <RichText content={children} extra={extra} />
          </blockquote>
        ), // TODO style
        Embed: ({ url, provider }) => (
          <Embed html={extra.embeds[url]?.html} url={url} provider={provider} />
        ),
        Figure: ({ url, caption }) => (
          <figure>
            <Image {...extra.media[url]} />
            <figcaption>{caption}</figcaption>
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
          return (
            <FootnoteDef id={id} extra={extra}>
              {children}
            </FootnoteDef>
          );
        },
        ...components,
      }}
    />
  );
};
