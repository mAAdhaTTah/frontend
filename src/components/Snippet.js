import React, { useRef, useLayoutEffect } from 'react';
import cc from 'classcat';
import { usePrism } from './Prism';

const Snippet = ({ code, language, filename }) => {
  const codeRef = useRef();
  const Prism = usePrism();

  useLayoutEffect(() => {
    // eslint-disable-next-line
    Prism?.highlightElement(codeRef.current);
  }, [Prism]);

  return (
    <pre
      className={cc(['line-numbers', `language-${language}`])}
      data-filename={filename}
    >
      <code ref={codeRef}>{code}</code>
    </pre>
  );
};

export default Snippet;
