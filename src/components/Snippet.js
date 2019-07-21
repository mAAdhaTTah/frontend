import React, { useRef, useLayoutEffect } from 'react';
import cc from 'classcat';
import { usePrism } from './Prism';

const Snippet = ({ code, language, filename }) => {
  const codeRef = useRef();
  const Prism = usePrism();

  useLayoutEffect(() => {
    Prism?.highlightElement(codeRef.current);
  }, [codeRef.current, Prism]);

  return (
    <div className="mb-5">
      <pre className={cc([`language-${language}`])} data-filename={filename}>
        <code ref={codeRef}>{code}</code>
      </pre>
    </div>
  );
};

export default Snippet;
