import { useMemo } from 'react';
import parse, { domToReact } from 'html-react-parser';
import { Body, Heading, Link } from '@ui/typography';
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
            return (
              <pre className="mb-5">{domToReact(node.children, options)}</pre>
            );
          case 'code':
            return (
              <code className="whitespace-nowrap">
                {domToReact(node.children, options)}
              </code>
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
