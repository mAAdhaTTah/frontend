---
description: Module References in CommonJS
status: publish
gistId: ''
sync: false
createdAt: '2016-02-04T16:07:24.000Z'
updatedAt: '2016-02-04T16:07:24.000Z'
blobs:
  - filename: index.js
    code: |-
      var mod1 = require('./mod1');
      var mod2 = require('./mod2');

      mod1.impactMod2();
      console.log(mod2.prop);
    language: js
  - filename: mod1.js
    code: |
      var mod2 = require('./mod2');

      exports.impactMod2 = function() {
          mod2.prop = 'Changed from mod1';
      };
    language: js
  - filename: mod2.js
    code: exports.prop = 'Defaulted in mod2';
    language: js
---

