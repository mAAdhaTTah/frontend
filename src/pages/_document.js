import { Html, Head, Main, NextScript } from 'next/document';

const Document = () => {
  return (
    <Html lang="en">
      <Head>
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Feed (RSS) | James DiGioia"
          href="https://jamesdigioia.com/feed/"
        />
        <link
          rel="alternate"
          type="application/feed+json"
          title="Feed (JSON) | James DiGioia"
          href="https://jamesdigioia.com/feed/json/"
        />
        <link
          rel="alternate"
          type="application/atom+xml"
          title="Feed (Atom) | James DiGioia"
          href="https://jamesdigioia.com/feed/atom/"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
