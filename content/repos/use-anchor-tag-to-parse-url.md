---
description: Use Anchor Tag to Parse URL
status: publish
gistId: ''
sync: false
createdAt: '2016-10-20T17:39:02.000Z'
updatedAt: '2016-10-20T17:39:02.000Z'
blobs:
  - filename: geturlobject.js
    code: |-
      function getURLObject(url) {
          const parser = document.createElement('a');
          parser.href = url;

          return {
              protocol: parser.protocol,
              hostname: parser.hostname,
              port: parser.port,
              pathname: parser.pathname,
              search: parser.search,
              hash: parser.hash,
              host: parser.host
          };
      }
    language: js
---

