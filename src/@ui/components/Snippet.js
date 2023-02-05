import cc from 'classcat';
import Highlight from 'prism-react-renderer';
import Prism from 'prismjs';
import 'prismjs/plugins/toolbar/prism-toolbar.css';
import { useReducer, useRef } from 'react';

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
    <Highlight Prism={Prism} code={code.trim()} language={language}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <div className="code-toolbar">
          <pre
            className={cc([className, 'line-numbers'])}
            style={style}
            ref={preRef}
          >
            {tokens.map((line, i) => (
              <div {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span {...getTokenProps({ token, key })} />
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
