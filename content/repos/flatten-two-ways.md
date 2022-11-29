---
description: flatten two ways
status: publish
gistId: a762aba9112b021ac31f42eda2040dfd
sync: false
createdAt: '2018-04-15T22:04:56.000Z'
updatedAt: '2018-04-17T19:41:03.000Z'
blobs:
  - filename: recursive-flatten.js
    code: |-
      function flatten(source, acc = []) {
          if (source.length === 0) return acc;

          const [head, ...tail] = source;

          return flatten(tail, [...acc, ...(Array.isArray(head) ? flatten(head) : [head])]);
      }

      console.log(flatten([1,2,[3,4,5,[6,7],8,[9]],10]));
    language: js
  - filename: point-free-flatten.js
    code: "import * as R from 'ramda';\n\nconst flatten = R.ifElse(\n    R.propSatisfies(R.equals(0), 'length'),\n    R.flip(R.identity),\n    R.converge((source, acc = []) => flatten(source, acc), [\n\t    R.tail,\n        R.useWith(R.flip(R.concat), [\n\t        R.pipe(R.head, R.ifElse(Array.isArray, head => flatten(head, []), R.of)),\n\t        R.identity\n        ])\n    ])\n);\n\nconsole.log(flatten([1,2,[3,4,5,[6,7],8,[9]],10], []));"
    language: js
commits:
  - committedAt: '2018-04-17T23:40:59.000Z'
    description: flatten two ways
    blobs:
      - filename: recursive-flatten.js
        code: |-
          function flatten(source, acc = []) {
              if (source.length === 0) return acc;

              const [head, ...tail] = source;

              return flatten(tail, [...acc, ...(Array.isArray(head) ? flatten(head) : [head])]);
          }

          console.log(flatten([1,2,[3,4,5,[6,7],8,[9]],10]));
        language: js
      - filename: point-free-flatten.js
        code: "import * as R from 'ramda';\n\nconst flatten = R.ifElse(\n    R.propSatisfies(R.equals(0), 'length'),\n    R.flip(R.identity),\n    R.converge((source, acc = []) => flatten(source, acc), [\n\t    R.tail,\n        R.useWith(R.flip(R.concat), [\n\t        R.pipe(R.head, R.ifElse(Array.isArray, head => flatten(head, []), R.of)),\n\t        R.identity\n        ])\n    ])\n);\n\nconsole.log(flatten([1,2,[3,4,5,[6,7],8,[9]],10], []));"
        language: js
  - committedAt: '2018-04-17T23:26:26.000Z'
    description: flatten two ways
    blobs:
      - filename: recursive-flatten.js
        code: |-
          function flatten(source, acc = []) {

              if (source.length === 0) return acc;

              const [head, ...tail] = source;

              return flatten(tail, [...acc, ...(Array.isArray(head) ? flatten(head) : [head])]);
          }

          console.log(flatten([1,2,[3,4,5,[6,7],8,[9]],10]));
        language: js
      - filename: point-free-flatten.js
        code: "import * as R from 'ramda';\n\nconst flatten = R.ifElse(\n    R.propSatisfies(R.equals(0), 'length'),\n    R.flip(R.identity),\n    R.converge((source, acc = []) => flatten(source, acc), [\n\t    R.tail,\n        R.useWith(R.flip(R.concat), [\n\t        R.pipe(R.head, R.ifElse(Array.isArray, head => flatten(head, []), R.of)),\n\t        R.identity\n        ])\n    ])\n);\n\nconsole.log(flatten([1,2,[3,4,5,[6,7],8,[9]],10], []));"
        language: js
  - committedAt: '2018-04-16T12:18:33.000Z'
    description: flatten two ways
    blobs:
      - filename: recursive-flatten.js
        code: |-
          function flatten(source, acc = []) {
              if (source.length === 0) return acc;

              const [head, ...tail] = source;

              return flatten(tail, [...acc, ...(Array.isArray(head) ? flatten(head) : [head])]);
          }

          console.log(flatten([1,2,[3,4,5,[6,7],8,[9]],10]));
        language: js
      - filename: point-free-flatten.js
        code: "import * as R from 'ramda';\n\nconst flatten = R.ifElse(\n    R.propSatisfies(R.equals(0), 'length'),\n    R.flip(R.identity),\n    R.converge((source, acc = []) => flatten(source, acc), [\n\t    R.tail,\n        R.useWith(R.flip(R.concat), [\n\t        R.pipe(R.head, R.ifElse(Array.isArray, head => flatten(head, []), R.of)),\n\t        R.identity\n        ])\n    ])\n);\n\nconsole.log(flatten([1,2,[3,4,5,[6,7],8,[9]],10], []));"
        language: js
  - committedAt: '2018-04-16T11:57:17.000Z'
    description: flatten two ways
    blobs:
      - filename: recursive-flatten.js
        code: |-
          function flatten(source, acc = []) {
              if (source.length === 0) return acc;

              const [head, ...tail] = source;

              return flatten(tail, [...acc, ...(Array.isArray(head) ? flatten(head) : [head])]);
          }

          console.log(flatten([1,2,[3,4,5,[6,7],8,[9]],10]));
        language: js
      - filename: point-free-flatten.js
        code: |-
          import * as R from 'ramda';

          const flatten =
        language: js
  - committedAt: '2018-04-16T02:04:56.000Z'
    description: flatten two ways
    blobs:
      - filename: recursive-flatten.js
        code: |-
          function flatten(source, acc = []) {
              if (source.length === 0) return acc;

              const [head, ...tail] = source;

              return flatten(tail, [...acc, ...(Array.isArray(head) ? flatten(head) : [head])]);
          }

          console.log(flatten([1,2,[3,4,5,[6,7],8,[9]],10]));
        language: js
---

