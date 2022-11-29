---
description: Point-Free Style - Functional Light JS v2 from Front-End Masters
status: publish
gistId: ''
sync: false
createdAt: '2017-12-03T10:27:59.000Z'
updatedAt: '2017-12-03T10:28:25.000Z'
blobs:
  - filename: problem.js
    code: "function output(txt) {\n\tconsole.log(txt);\n}\n\nfunction printIf(predicate) {\n\treturn function(msg) {\n\t\tif (predicate(msg)) {\n\t\t\toutput(msg);\n\t\t}\n\t};\n}\n\nfunction isShortEnough(str) {\n\treturn str.length <= 5;\n}\n\nfunction isLongEnough(str) {\n\treturn !isShortEnough(str);\n}\n\nvar msg1 = \"Hello\";\nvar msg2 = msg1 + \" World\";\n\nprintIf(isShortEnough)(msg1);\t\t// Hello\nprintIf(isShortEnough)(msg2);\nprintIf(isLongEnough)(msg1);\nprintIf(isLongEnough)(msg2);\t\t// Hello World"
    language: js
  - filename: point-free.js
    code: |-
      const output = console.log.bind(console);
      const when = func => pred => val => {
        if (predicate(val)) {
          func(val);
        }
      };
      const not = func => val => !func(val);
      const printIf = when(output);
      const isShortEnough = str => str.length <= 5;
      const isLongEnough = not(isShortEnough);
    language: js
commits:
  - committedAt: '2017-12-03T15:28:25.000Z'
    description: Point-Free Style - Functional Light JS v2 from Front-End Masters
    blobs:
      - filename: problem.js
        code: "function output(txt) {\n\tconsole.log(txt);\n}\n\nfunction printIf(predicate) {\n\treturn function(msg) {\n\t\tif (predicate(msg)) {\n\t\t\toutput(msg);\n\t\t}\n\t};\n}\n\nfunction isShortEnough(str) {\n\treturn str.length <= 5;\n}\n\nfunction isLongEnough(str) {\n\treturn !isShortEnough(str);\n}\n\nvar msg1 = \"Hello\";\nvar msg2 = msg1 + \" World\";\n\nprintIf(isShortEnough)(msg1);\t\t// Hello\nprintIf(isShortEnough)(msg2);\nprintIf(isLongEnough)(msg1);\nprintIf(isLongEnough)(msg2);\t\t// Hello World"
        language: js
      - filename: point-free.js
        code: |-
          const output = console.log.bind(console);
          const when = func => pred => val => {
            if (predicate(val)) {
              func(val);
            }
          };
          const not = func => val => !func(val);
          const printIf = when(output);
          const isShortEnough = str => str.length <= 5;
          const isLongEnough = not(isShortEnough);
        language: js
  - committedAt: '2017-12-03T15:27:52.000Z'
    description: Point-Free Style - Functional Light JS v2 from Front-End Masters
    blobs:
      - filename: problem.js
        code: "function output(txt) {\n\tconsole.log(txt);\n}\n\nfunction printIf(predicate) {\n\treturn function(msg) {\n\t\tif (predicate(msg)) {\n\t\t\toutput(msg);\n\t\t}\n\t};\n}\n\nfunction isShortEnough(str) {\n\treturn str.length <= 5;\n}\n\nfunction isLongEnough(str) {\n\treturn !isShortEnough(str);\n}\n\nvar msg1 = \"Hello\";\nvar msg2 = msg1 + \" World\";\n\nprintIf(isShortEnough)(msg1);\t\t// Hello\nprintIf(isShortEnough)(msg2);\nprintIf(isLongEnough)(msg1);\nprintIf(isLongEnough)(msg2);\t\t// Hello World"
        language: js
      - filename: point-free.js
        code: |-
          const output = console.log.bind(console);
          const when = func => pred => val => {
            if (predicate(val)) {
              func(val);
            }
          };
          const not = func => val => !func(val);
          const printIf = when(output);
          const isShortEnough = (str) => str.length <= 5;
          const isLongEnough = not(isShortEnough);
        language: js
  - committedAt: '2017-12-03T14:50:35.000Z'
    description: Point-Free Style - Functional Light JS v2 from Front-End Masters
    blobs:
      - filename: problem.js
        code: "function output(txt) {\n\tconsole.log(txt);\n}\n\nfunction printIf(predicate) {\n\treturn function(msg) {\n\t\tif (predicate(msg)) {\n\t\t\toutput(msg);\n\t\t}\n\t};\n}\n\nfunction isShortEnough(str) {\n\treturn str.length <= 5;\n}\n\nfunction isLongEnough(str) {\n\treturn !isShortEnough(str);\n}\n\nvar msg1 = \"Hello\";\nvar msg2 = msg1 + \" World\";\n\nprintIf(isShortEnough)(msg1);\t\t// Hello\nprintIf(isShortEnough)(msg2);\nprintIf(isLongEnough)(msg1);\nprintIf(isLongEnough)(msg2);\t\t// Hello World"
        language: js
---

