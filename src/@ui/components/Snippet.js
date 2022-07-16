import { useRef, useEffect } from 'react';
import cc from 'classcat';
import { usePrism } from './Prism';

const Snippet = ({ code, language, filename }) => {
  const codeRef = useRef();
  const Prism = usePrism();

  useEffect(() => {
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
