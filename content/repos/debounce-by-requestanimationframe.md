---
description: debounce by requestAnimationFrame
status: publish
gistId: ''
sync: false
createdAt: '2016-08-28T17:25:39.000Z'
updatedAt: '2016-08-28T17:25:39.000Z'
blobs:
  - filename: debounce-raf.js
    code: |-
      events$.withHandler((() => {
          let last, emitter, loop;

          return (_emitter, { value, type }) => {
              emitter = _emitter;

              switch (type) {
                  case 'value':
                      last = value;

                      if (!loop) {
                          loop = requestAnimationFrame(() => {
                              emitter.value(last);
                              last = undefined;
                              loop = undefined;
                          });
                      }
                      break;
                  case 'error':
                      emitter.error(value);
                      break;
                  case 'end':
                      if (loop) {
                          cancelAnimationFrame(loop);
                      }

                      loop = requestAnimationFrame(() => {
                          if (last) {
                              emitter.value(last);
                          }

                          emitter.end();

                          last = undefined;
                          loop = undefined;
                      });
                      break;
              }
          };
      })())
    language: js
---

