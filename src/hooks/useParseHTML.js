import React, { useMemo } from 'react';
import parse, { domToReact } from 'html-react-parser';
import cc from 'classcat';
import { Body, H2, Link, Snippet } from '../components';

const linkClass = cc(['text-darkg', 'font-bold']);

export default (string, { p = '', h2 = '', a = '' } = {}) =>
  useMemo(() => {
    const options = {
      replace: function replace(node) {
        switch (node.name) {
          case 'p':
            return (
              <Body className={p}>{domToReact(node.children, options)}</Body>
            );
          case 'h2':
            return (
              <H2 className={h2 ?? ''}>{domToReact(node.children, options)}</H2>
            );
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
            if (node.attribs.class === 'gistpen') {
              return (
                <Snippet
                  code={node.children[0].children[0].data}
                  language={node.children[0].attribs.class.replace(
                    'language-',
                    ''
                  )}
                  filename={node.attribs['data-filename']}
                />
              );
            }

            return;
          default:
            return; // initially undefined
        }
      },
    };

    return parse(string, options);
  }, [string, h2, a]);
