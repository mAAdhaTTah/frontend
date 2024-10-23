import { Link, Paragraph } from '@ui/typography';
import Script from 'next/script';
import { useMemo } from 'react';

const EXTERNAL_SCRIPT = /<script[^>]+src=(['"])(.*?)\1/i;
const INJECTED_SCRIPT =
  /<script[\s\S]*?>[\s\S]*?createElement[\s\S]*?src\s?=\s?(['"])(.*?)\1/i;

/**
 * Find the URI for the external file loaded from a script tag.
 *
 * @param {String} script The string HTML of a <script> tag.
 * @returns {String|null} The URI of the requested external script, otherwise null.
 */
const extractExternalScriptURL = (script: any) => {
  const match = script.match(EXTERNAL_SCRIPT);
  // Return null if no match, otherwise return the second capture group.
  return match && match[2];
};

/**
 * Find the URI for a script being injected from inline JS.
 *
 * @param {String} script The string HTML of a <script> tag.
 * @returns {String|null} The URI of a script being injected from inline JS, otherwise null.
 */
const extractInjectedScriptURL = (script: any) => {
  const match = script.match(INJECTED_SCRIPT);
  // Return null if no match, otherwise return the second capture group.
  return match && match[2];
};

/**
 * Match either external or inline-script-injected script tag source URIs.
 *
 * @param {String} script The string HTML of a <script> tag
 * @returns {String|null} The URI of the script file this script tag loads, or null.
 */
const extractScriptURL = (script: any) =>
  extractExternalScriptURL(script) || extractInjectedScriptURL(script);

/**
 * Remove duplicate or undefined values from an array of strings.
 *
 * @param {String[]} scripts script file URIs.
 */
const uniqueURIs = (scripts: any) =>
  Object.keys(
    scripts.reduce(
      (keys: any, script: any) =>
        script
          ? {
              ...keys,
              [script]: true,
            }
          : keys,
      {},
    ),
  );

/**
 * Parse a string of HTML and identify the JS files loaded by any contained script tags.
 *
 * @param {String} string String containing HTML markup which may include script tags.
 * @returns {String[]} Array of any script URIs we believe to be loaded in this HTML.
 */
const getScripts = (string: any) => {
  const scripts = string.match(/<script[\s\S]*?<\/script>/gi);
  return scripts ? uniqueURIs(scripts.map(extractScriptURL)) : [];
};

const styles = {
  twitter: {
    maxWidth: '500px',
  },
};
export const Embed = ({ html, url, provider }: any) => {
  const scripts = useMemo(() => html && getScripts(html), [html]);
  if (!html)
    return (
      <Paragraph>
        <Link href={url}>{url}</Link>
      </Paragraph>
    );
  return (
    <>
      <div
        // @ts-expect-error TS(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        style={styles[provider]}
        dangerouslySetInnerHTML={{
          __html: html,
        }}
      />
      {scripts.map((src: any) => (
        <Script key={src} src={src} />
      ))}
    </>
  );
};
