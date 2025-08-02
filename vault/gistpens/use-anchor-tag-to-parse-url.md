---
tags:
  - web
  - snippet
title: Use Anchor Tag to Parse URL
description: ""
slug: gistpens/use-anchor-tag-to-parse-url
published_at: 2016-10-20T17:39:02.000Z
updated_at: 2016-10-20T17:39:02.000Z
share: true
---

```js title="geturlobject.js"
function getURLObject(url) {
  const parser = document.createElement("a");
  parser.href = url;

  return {
    protocol: parser.protocol,
    hostname: parser.hostname,
    port: parser.port,
    pathname: parser.pathname,
    search: parser.search,
    hash: parser.hash,
    host: parser.host,
  };
}
```

^geturlobject-js
