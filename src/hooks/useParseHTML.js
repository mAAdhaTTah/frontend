import { useMemo } from 'react';
import parse, { domToReact } from 'html-react-parser';
import cc from 'classcat';
import { Body, H2, H3, H4, Link, Snippet } from '../components';

const linkClass = cc(['text-darkg']);

export const useParseHTML = (
  string,
  { p = '', h2 = '', h3 = '', h4 = '', a = '' } = {},
) =>
  useMemo(() => {
    const options = {
      replace(node) {
        switch (node.name) {
          case 'p':
            return (
              <Body className={p}>{domToReact(node.children, options)}</Body>
            );
          case 'h2':
            return <H2 className={h2}>{domToReact(node.children, options)}</H2>;
          case 'h3':
            return <H3 className={h3}>{domToReact(node.children, options)}</H3>;
          case 'h4':
            return <H4 className={h4}>{domToReact(node.children, options)}</H4>;
          case 'a':
            return (
              <Link
                href={node.attribs.href}
                className={cc([linkClass, a ?? ''])}
              >
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
  }, [string, p, h2, h3, h4, a]);
