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
import ReactMarkdown from 'react-markdown';
import { Snippet } from '../../components';

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
  a({ node, children }) {
    return <Link href={node.properties.href}>{children}</Link>;
  },
  pre({ node, children }) {
    if (node.properties.class?.includes('gistpen')) {
      return (
        <div className="mb-5">
          <Snippet
            code={node.children[0].children[0].data}
            language={node.children[0].attributes.class.replace(
              'language-',
              '',
            )}
            filename={node.properties['data-filename']}
          />
        </div>
      );
    }
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
  abbr({ node, children }) {
    return <Abbr title={node.properties.title}>{children}</Abbr>;
  },
  acronym({ node, children }) {
    return <Acronym title={node.properties.title}>{children}</Acronym>;
  },
};

export const Mdx = ({ content }) => {
  return <ReactMarkdown components={components}>{content}</ReactMarkdown>;
};
