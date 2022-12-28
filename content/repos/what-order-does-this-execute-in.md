---
description: What Order Does This Execute In?
status: publish
gistId: ''
sync: false
createdAt: '2018-05-31T11:32:15.000Z'
updatedAt: '2018-05-31T11:32:15.000Z'
blobs:
  - filename: promises.js
    code: |-
      setTimeout(() => {
          console.log('inside timeout');
      }, 0);

      process.nextTick(() => {
          console.log('inside nextTick');
      });

      const p = new Promise(function(resolve, reject) {
          console.log('inside promise');

          resolve();
      })
          .then(() => console.log('inside then'));

      console.log('after promise');
    language: js
commits:
  - committedAt: '2018-05-31T15:32:15.000Z'
    description: What Order Does This Execute In?
    blobs:
      - filename: promises.js
        code: |-
          setTimeout(() => {
              console.log('inside timeout');
          }, 0);

          process.nextTick(() => {
              console.log('inside nextTick');
          });

          const p = new Promise(function(resolve, reject) {
              console.log('inside promise');

              resolve();
          })
              .then(() => console.log('inside then'));

          console.log('after promise');
        language: js
---

