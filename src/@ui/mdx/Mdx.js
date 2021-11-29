import { MDXRemote } from 'next-mdx-remote';
import { Li, Ol, Ul } from '@ui/atoms';
import {
  Heading,
  Link,
  Pre,
  Code,
  EM,
  Strong,
  Small,
  Del,
  Kbd,
  Samp,
  Var,
  Q,
  Sub,
  Sup,
  Abbr,
  Acronym,
  Body,
} from '@ui/typography';
import { StrapiResume } from '@strapi/resume';

const components = {
  ul({ children }) {
    return <Ul>{children}</Ul>;
  },
  ol({ children }) {
    return <Ol>{children}</Ol>;
  },
  li({ children }) {
    return <Li>{children}</Li>;
  },
  p({ children }) {
    return <Body>{children}</Body>;
  },
  h1({ children }) {
    return (
      <Heading level={1} variant="h-1">
        {children}
      </Heading>
    );
  },
  h2({ children }) {
    return (
      <Heading level={2} variant="h-2">
        {children}
      </Heading>
    );
  },
  h3({ children }) {
    return (
      <Heading level={3} variant="h-3">
        {children}
      </Heading>
    );
  },
  h4({ children }) {
    return (
      <Heading level={4} variant="h-4">
        {children}
      </Heading>
    );
  },
  a({ children, href, title }) {
    return (
      <Link href={href} title={title}>
        {children}
      </Link>
    );
  },
  pre({ children }) {
    return <Pre>{children}</Pre>;
  },
  code({ children }) {
    return <Code>{children}</Code>;
  },
  em({ children }) {
    return <EM>{children}</EM>;
  },
  strong({ children }) {
    return <Strong>{children}</Strong>;
  },
  small({ children }) {
    return <Small>{children}</Small>;
  },
  del({ children }) {
    return <Del>{children}</Del>;
  },
  kbd({ children }) {
    return <Kbd>{children}</Kbd>;
  },
  samp({ children }) {
    return <Samp>{children}</Samp>;
  },
  var({ children }) {
    return <Var>{children}</Var>;
  },
  q({ children }) {
    return <Q>{children}</Q>;
  },
  sub({ children }) {
    return <Sub>{children}</Sub>;
  },
  sup({ children }) {
    return <Sup>{children}</Sup>;
  },
  abbr({ title, children }) {
    return <Abbr title={title}>{children}</Abbr>;
  },
  acronym({ title, children }) {
    return <Acronym title={title}>{children}</Acronym>;
  },
  Resume({ id }) {
    return <StrapiResume id={id} />;
  },
};

export const Mdx = ({ source }) => {
  return <MDXRemote {...source} components={components} />;
};
