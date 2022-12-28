---
description: Pipe & Compose - Functional Light JS v2 from Front-End Masters
status: publish
gistId: ''
sync: false
createdAt: '2017-12-04T11:07:58.000Z'
updatedAt: '2017-12-04T11:08:16.000Z'
blobs:
  - filename: pipe.js
    code: |-
      const pipe = (...funcs) => (...args) =>
          funcs.reduce((args, func) => [func(...args)], args)[0];
    language: js
  - filename: compose.js
    code: |-
      // just reverse the funcs array...?
      const compose = (...funcs) => (...args) =>
          funcs.reverse().reduce((args, func) => [func(...args)], args)[0];
    language: js
commits:
  - committedAt: '2017-12-04T16:08:17.000Z'
    description: Pipe & Compose - Functional Light JS v2 from Front-End Masters
    blobs:
      - filename: pipe.js
        code: |-
          const pipe = (...funcs) => (...args) =>
              funcs.reduce((args, func) => [func(...args)], args)[0];
        language: js
      - filename: compose.js
        code: |-
          // just reverse the funcs array...?
          const compose = (...funcs) => (...args) =>
              funcs.reverse().reduce((args, func) => [func(...args)], args)[0];
        language: js
  - committedAt: '2017-12-04T16:07:58.000Z'
    description: Pipe & Compose - Functional Light JS v2 from Front-End Masters
    blobs:
      - filename: pipe.js
        code: >-
          const pipe = (...funcs) => (...args) => funcs.reduce((args, func) =>
          [func(...args)], args)[0];
        language: js
      - filename: compose.js
        code: >-
          // just reverse the funcs array...?

          const compose = (...funcs) => (...args) =>
          funcs.reverse().reduce((args, func) => [func(...args)], args)[0];
        language: js
---

