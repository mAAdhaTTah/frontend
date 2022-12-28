---
description: Observable Rendering
status: publish
gistId: ''
sync: false
createdAt: '2016-11-02T23:30:34.000Z'
updatedAt: '2017-10-12T21:51:07.000Z'
blobs:
  - filename: component.js
    code: |-
      import Kefir from 'kefir';

      export default function EditorComponent(el, props$) {
          const keyup$ = Kefir.fromEvents(el, 'keyup');
          const keydown$ = Kefir.fromEvents(el, 'keydown');

          return props$.sampledBy(keyup$.debounce(150))
              .flatMapLatest(props =>
                  createRenderStream(props).takeUntil(keydown$)
              );

          function createRenderStream(props) {
              return Kefir.stream(emitter => {
                  const loop = requestAnimationFrame(() => {
                      // Update the element
                      emitter.end();
                  });

                  return () => cancelAnimationFrame(loop);
              });
          }
      };
    language: js
commits:
  - committedAt: '2017-10-13T01:51:07.000Z'
    description: Observable Rendering
    blobs:
      - filename: component.js
        code: |-
          import Kefir from 'kefir';

          export default function EditorComponent(el, props$) {
              const keyup$ = Kefir.fromEvents(el, 'keyup');
              const keydown$ = Kefir.fromEvents(el, 'keydown');

              return props$.sampledBy(keyup$.debounce(150))
                  .flatMapLatest(props =>
                      createRenderStream(props).takeUntil(keydown$)
                  );

              function createRenderStream(props) {
                  return Kefir.stream(emitter => {
                      const loop = requestAnimationFrame(() => {
                          // Update the element
                          emitter.end();
                      });

                      return () => cancelAnimationFrame(loop);
                  });
              }
          };
        language: js
---

