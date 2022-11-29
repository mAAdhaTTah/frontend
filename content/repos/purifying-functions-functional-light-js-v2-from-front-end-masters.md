---
description: Purifying Functions - Functional Light JS v2 from Front-End Masters
status: publish
gistId: ''
sync: false
createdAt: '2017-12-01T12:22:41.000Z'
updatedAt: '2017-12-01T12:24:06.000Z'
blobs:
  - filename: problem.js
    code: "function foo(x) {\n\ty++;\n\tz = x * y;\n}\n\nvar y = 5, z;\n\nfoo(20);\nz;\t\t// 120\n\nfoo(25);\nz;\t\t// 175"
    language: js
  - filename: wraps.js
    code: |-
      function Foo(x, y) {
          var z;

          function foo(x) {
              y++;
              z = x * y;
          }

          foo(x);

          return [y, z];
      }
    language: js
  - filename: adapts.js
    code: |-
      function foo(x) {
          y++;
          z = x * y;
      }

      function Foo(x) {
          var [origY, origZ] = [y,z];
          foo(x);
          var [newY, newZ] = [y, z];
          [y, z] = [origY, origZ];
          
          return [newY, newZ];
      }
    language: js
commits:
  - committedAt: '2017-12-01T17:24:06.000Z'
    description: Purifying Functions - Functional Light JS v2 from Front-End Masters
    blobs:
      - filename: problem.js
        code: "function foo(x) {\n\ty++;\n\tz = x * y;\n}\n\nvar y = 5, z;\n\nfoo(20);\nz;\t\t// 120\n\nfoo(25);\nz;\t\t// 175"
        language: js
      - filename: wraps.js
        code: |-
          function Foo(x, y) {
              var z;

              function foo(x) {
                  y++;
                  z = x * y;
              }

              foo(x);

              return [y, z];
          }
        language: js
      - filename: adapts.js
        code: |-
          function foo(x) {
              y++;
              z = x * y;
          }

          function Foo(x) {
              var [origY, origZ] = [y,z];
              foo(x);
              var [newY, newZ] = [y, z];
              [y, z] = [origY, origZ];
              
              return [newY, newZ];
          }
        language: js
  - committedAt: '2017-12-01T17:22:41.000Z'
    description: Purifying Functions - Functional Light JS v2 from Front-End Masters
    blobs:
      - filename: problem.js
        code: "function foo(x) {\n\ty++;\n\tz = x * y;\n}\n\nvar y = 5, z;\n\nfoo(20);\nz;\t\t// 120\n\nfoo(25);\nz;\t\t// 175"
        language: js
      - filename: wraps.js
        code: |-
          function Foo(x) {
              var y = 5, z;

              function foo(x) {
                  y++;
                  z = x * y;
              }

              foo(x);

              return [y, z];
          }
        language: js
      - filename: adapts.js
        code: "function foo(x) {\n\ty++;\n\tz = x * y;\n}\n\nfunction Foo(x) {\n    var [origY, origZ] = [y,z];\n    foo(x);\n    var [newY, newZ] = [y, z];\n    [y, z] = [origY, origZ];\n    \n    return [newY, newZ];\n}"
        language: js
  - committedAt: '2017-12-01T17:20:37.000Z'
    description: Purifying Functions - Functional Light JS v2 from Front-End Masters
    blobs:
      - filename: problem.js
        code: "function foo(x) {\n\ty++;\n\tz = x * y;\n}\n\nvar y = 5, z;\n\nfoo(20);\nz;\t\t// 120\n\nfoo(25);\nz;\t\t// 175"
        language: js
      - filename: wraps.js
        code: |-
          function Foo(x) {
              var y = 5, z;
              function foo(x) {
                  y++;
                  z = x * y;
              }
              foo(x);

              return [y, z];
          }
        language: js
      - filename: adapts.js
        code: "function foo(x) {\n\ty++;\n\tz = x * y;\n}\n\nfunction Foo(x) {\n    var [origY, origZ] = [y,z];\n    foo(x);\n    var [newY, newZ] = [y, z];\n    [y, z] = [origY, origZ];\n    \n    return [newY, newZ];\n}"
        language: js
  - committedAt: '2017-12-01T17:06:18.000Z'
    description: Purifying Functions - Functional Light JS v2 from Front-End Masters
    blobs:
      - filename: problem.js
        code: TKTK
        language: js
---

