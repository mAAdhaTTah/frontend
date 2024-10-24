'use client';
import { Ol, Li } from '@ui/atoms';
import { createContext, useContext, useRef } from 'react';
import { Link, Paragraph } from '@ui/typography';
import { RichText } from './RichText';

const FootnoteContext = createContext([]);
export const Footnotes = () => {
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
export const FootnoteProvider = ({ children }) => {
  const footnotes = [];
  return (
    <FootnoteContext.Provider value={footnotes}>
      {children}
    </FootnoteContext.Provider>
  );
};
export const useDefineFootnote = (id, content) => {
  const footnotes = useContext(FootnoteContext);
  const textReference = useRef(content);
  const indexReference = useRef(-1);

  if (indexReference.current === -1) {
    indexReference.current = footnotes.push({ id, content }) - 1;
  } else if (textReference.current !== content) {
    textReference.current = footnotes[indexReference.current] = { id, content };
  }
};

export const FootnoteDef = ({ id, children, extra }) => {
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
};
