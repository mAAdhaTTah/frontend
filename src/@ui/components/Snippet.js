import { Highlight } from 'prism-react-renderer';
// @TODO(mAAdhaTTah) replace this with SWC plugin
import Prism from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-markup-templating';
import 'prismjs/components/prism-php';
import 'prismjs/components/prism-yaml';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-git';
import 'prismjs/components/prism-sass';
import 'prismjs/components/prism-handlebars';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-ruby';
import 'prismjs/themes/prism-twilight.css';
import 'prismjs/plugins/toolbar/prism-toolbar.css';
import SnippetInteractive from './SnippetInteractive.js';

// Empty theme prevents prism-react-renderer's default inline styles from
// overriding the prism-twilight.css stylesheet.
const emptyTheme = { plain: {}, styles: [] };

const Snippet = ({ code, language, filename }) => {
  return (
    <Highlight prism={Prism} code={code} language={language} theme={emptyTheme}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <SnippetInteractive
          className={className}
          style={style}
          code={code}
          filename={filename}
        >
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token })} />
              ))}
            </div>
          ))}
        </SnippetInteractive>
      )}
    </Highlight>
  );
};

export default Snippet;
