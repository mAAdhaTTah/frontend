---
description: Simple Path
status: publish
gistId: ''
sync: false
createdAt: '2017-11-22T12:00:06.000Z'
updatedAt: '2017-11-22T12:00:41.000Z'
blobs:
  - filename: get.js
    code: |-
      const getPath = (path, target) =>
          path.split('.')
              .reduce((value, key) => value[key], target);

      // Usage
      const path = 'a.b.c';
      const target = {
          a: {
              b: {
                  c: true
              }
          }
      };

      assert(true === getPath(path, target));
    language: js
commits:
  - committedAt: '2017-11-22T17:00:41.000Z'
    description: Simple Path
    blobs:
      - filename: get.js
        code: |-
          const getPath = (path, target) =>
              path.split('.')
                  .reduce((value, key) => value[key], target);

          // Usage
          const path = 'a.b.c';
          const target = {
              a: {
                  b: {
                      c: true
                  }
              }
          };

          assert(true === getPath(path, target));
        language: js
  - committedAt: '2017-11-22T17:00:26.000Z'
    description: Simple Path
    blobs:
      - filename: get.js
        code: |-
          const getPath = (path, target) => path.split('.')
              .reduce((value, key) => value[key], target);

          // Usage
          const path = 'a.b.c';
          const target = {
              a: {
                  b: {
                      c: true
                  }
              }
          };

          assert(true === getPath(path, target));
        language: js
  - committedAt: '2017-11-22T17:00:06.000Z'
    description: Simple Path
    blobs:
      - filename: get.js
        code: |-
          const getPath = (path, target) => path.split('.').reduce((value, key)
          => value[key], target);


          // Usage

          const path = 'a.b.c';

          const target = {
              a: {
                  b: {
                      c: true
                  }
              }
          };


          assert(true === getPath(path, target));
        language: js
---

