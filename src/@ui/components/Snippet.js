'use client';
import cc from 'classcat';
import { useReducer, useRef } from 'react';
import Highlight from 'prism-react-renderer';
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

function fallbackCopyTextToClipboard(copyInfo) {
  const textArea = document.createElement('textarea');
  textArea.value = copyInfo.getText();

  // Avoid scrolling to bottom
  textArea.style.top = '0';
  textArea.style.left = '0';
  textArea.style.position = 'fixed';

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    const successful = document.execCommand('copy');
    setTimeout(function () {
      if (successful) {
        copyInfo.success();
      } else {
        copyInfo.error();
      }
    }, 1);
  } catch (err) {
    setTimeout(function () {
      copyInfo.error(err);
    }, 1);
  }

  document.body.removeChild(textArea);
}

function copyTextToClipboard(copyInfo) {
  if (navigator.clipboard) {
    navigator.clipboard
      .writeText(copyInfo.getText())
      .then(copyInfo.success, function () {
        // try the fallback in case `writeText` didn't work
        fallbackCopyTextToClipboard(copyInfo);
      });
  } else {
    fallbackCopyTextToClipboard(copyInfo);
  }
}

/**
 * Selects the text content of the given element.
 *
 * @param {Element} element
 */
function selectElementText(element) {
  // https://stackoverflow.com/a/20079910/7595472
  window.getSelection().selectAllChildren(element);
}

const reducer = (_state, action) => {
  switch (action) {
    case 'copy':
      return 'Copy to Clipboard';
    case 'copy-error':
      return 'Press Ctrl+C to copy';
    case 'copy-success':
      return 'Copied!';
    default:
      throw new Error(`Unknown action ${action}`);
  }
};

const Snippet = ({ code, language, filename }) => {
  const [copyButtonText, setState] = useReducer(reducer, 'Copy to Clipboard');
  const preRef = useRef();

  function resetText() {
    setTimeout(function () {
      setState('copy');
    }, 5000);
  }
  return (
    <Highlight Prism={Prism} code={code} language={language}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <div className="code-toolbar">
          <pre
            className={cc([className, 'line-numbers'])}
            style={style}
            ref={preRef}
          >
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
          <div className="toolbar">
            {filename && (
              <div className="toolbar-item">
                <span>{filename}</span>
              </div>
            )}
            <div className="toolbar-item">
              <button
                className="copy-to-clipboard-button"
                onClick={() =>
                  copyTextToClipboard({
                    getText: function () {
                      return code;
                    },
                    success: function () {
                      setState('copy-success');

                      resetText();
                    },
                    error: function () {
                      setState('copy-error');

                      setTimeout(function () {
                        selectElementText(preRef.current);
                      }, 1);

                      resetText();
                    },
                  })
                }
              >
                {copyButtonText}
              </button>
            </div>
          </div>
        </div>
      )}
    </Highlight>
  );
};

export default Snippet;
