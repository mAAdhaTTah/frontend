import { useMemo } from 'react';
import parse, { domToReact } from 'html-react-parser';
import {
  Abbr,
  Acronym,
  Body,
  Code,
  Del,
  EM,
  Heading,
  Kbd,
  Link,
  Pre,
  Q,
  Samp,
  Small,
  Strong,
  Sub,
  Sup,
  Var,
} from '@ui/typography';
import { Snippet } from '../components';

export const useParseHTML = string =>
  useMemo(() => {
    const options = {
      replace(node) {
        switch (node.name) {
          case 'p':
            return <Body>{domToReact(node.children, options)}</Body>;
          case 'h2':
            return (
              <Heading level={2} variant="h-2">
                {domToReact(node.children, options)}
              </Heading>
            );
          case 'h3':
            return (
              <Heading level={3} variant="h-3">
                {domToReact(node.children, options)}
              </Heading>
            );
          case 'h4':
            return (
              <Heading level={4} variant="h-4">
                {domToReact(node.children, options)}
              </Heading>
            );
          case 'a':
            return (
              <Link href={node.attribs.href}>
                {domToReact(node.children, options)}
              </Link>
            );
          case 'pre':
            if (node.attribs.class?.includes('gistpen')) {
              return (
                <div className="mb-5">
                  <Snippet
                    code={node.children[0].children[0].data}
                    language={node.children[0].attribs.class.replace(
                      'language-',
                      '',
                    )}
                    filename={node.attribs['data-filename']}
                  />
                </div>
              );
            }
            return <Pre>{domToReact(node.children, options)}</Pre>;
          case 'code':
            return <Code>{domToReact(node.children, options)}</Code>;
          case 'em':
            return <EM>{domToReact(node.children, options)}</EM>;
          case 'strong':
            return <Strong>{domToReact(node.children, options)}</Strong>;
          case 'small':
            return <Small>{domToReact(node.children, options)}</Small>;
          case 'del':
            return <Del>{domToReact(node.children, options)}</Del>;
          case 'kbd':
            return <Kbd>{domToReact(node.children, options)}</Kbd>;
          case 'samp':
            return <Samp>{domToReact(node.children, options)}</Samp>;
          case 'var':
            return <Var>{domToReact(node.children, options)}</Var>;
          case 'q':
            return <Q>{domToReact(node.children, options)}</Q>;
          case 'sub':
            return <Sub>{domToReact(node.children, options)}</Sub>;
          case 'sup':
            return <Sup>{domToReact(node.children, options)}</Sup>;
          case 'abbr':
            return (
              <Abbr title={node.attribs.title}>
                {domToReact(node.children, options)}
              </Abbr>
            );
          case 'acronym':
            return (
              <Acronym title={node.attribs.title}>
                {domToReact(node.children, options)}
              </Acronym>
            );
          case 'ul':
            return (
              <ul className="list-disc pl-4 mb-5">
                {domToReact(node.children, options)}
              </ul>
            );
          case 'ol':
            return (
              <ol className="list-decimal pl-4 mb-5">
                {domToReact(node.children, options)}
              </ol>
            );
          case 'li':
            return (
              <li className="mb-1 font-ovo text-xl">
                {domToReact(node.children, options)}
              </li>
            );
          case '--': // fix for /maadhattahwriting/
            return <>{'<-->'}</>;
          default:
            return; // initially undefined
        }
      },
    };

    return parse(string, options);
  }, [string]);
