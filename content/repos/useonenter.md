---
description: useOnEnter
status: publish
gistId: ''
sync: false
createdAt: '2019-03-10T20:36:51.000Z'
updatedAt: '2019-03-10T20:51:01.000Z'
blobs:
  - filename: useOnEnter.js
    code: |-
      import React, { useContext, useEffect } from 'react';
      import { StdinContext } from 'ink';

      export default function useOnEnter(onEnter) {
        const { stdin } = useContext(StdinContext);

        useEffect(() => {
          const onData = data => {
            const s = data.toString();

            if (s === '\r') {
              onEnter();
            }
          };

          stdin.on('data', onData);

          return () => {
            stdin.off('data', onData);
          };
        });
      };
    language: js
commits:
  - committedAt: '2019-03-11T00:51:01.000Z'
    description: useOnEnter
    blobs:
      - filename: useOnEnter.js
        code: |-
          import React, { useContext, useEffect } from 'react';
          import { StdinContext } from 'ink';

          export default function useOnEnter(onEnter) {
            const { stdin } = useContext(StdinContext);

            useEffect(() => {
              const onData = data => {
                const s = data.toString();

                if (s === 'r') {
                  onEnter();
                }
              };

              stdin.on('data', onData);

              return () => {
                stdin.off('data', onData);
              };
            });
          };
        language: js
  - committedAt: '2019-03-11T00:50:48.000Z'
    description: useOnEnter
    blobs:
      - filename: useOnEnter.js
        code: |-
          import React, { useContext, useEffect } from 'react';
          import { StdinContext } from 'ink';

          export default function useOnEnter(onEnter) {
            const { stdin } = useContext(StdinContext);

            useEffect(() => {
              const onData = data => {
                const s = data.toString();

                if (s === 'r') {
                  onEnter();
                }
              };

              stdin.on('data', onData);

              return () => {
                stdin.off('data', onData);
              };
            });
          };
        language: js
  - committedAt: '2019-03-11T00:36:51.000Z'
    description: useOnEnter
    blobs:
      - filename: useOnEnter.js
        code: |-
          export default function useOnEnter(onEnter) {
            const { stdin } = useContext(StdinContext);

            useEffect(() => {
              const onData = data => {
                const s = data.toString();

                if (s === 'r') {
                  onSubmit();
                }
              };

              stdin.on('data', onData);

              return () => {
                stdin.off('data', onData);
              };
            });
          };
        language: js
---

