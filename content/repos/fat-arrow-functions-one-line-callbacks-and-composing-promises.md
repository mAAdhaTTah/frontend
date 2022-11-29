---
description: 'Fat Arrow Functions, One-Line Callbacks, and Composing Promises'
status: publish
gistId: ''
sync: false
createdAt: '2015-12-22T11:20:17.000Z'
updatedAt: '2015-12-22T11:20:17.000Z'
blobs:
  - filename: old-style.js
    code: |-
      doSomething().then(function(value) {
          return value.prop
      });
    language: js
  - filename: new-style.js
    code: doSomething().then(value => value.prop);
    language: js
  - filename: composing-promises.js
    code: |-
      doSomething().then(value => value.asyncMethod())
          .then(asyncMethodValue => asyncMethodValue.prop);
    language: js
---

