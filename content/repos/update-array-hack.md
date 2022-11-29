---
description: Update Array Hack
status: publish
gistId: ''
sync: false
createdAt: '2018-11-07T11:47:42.000Z'
updatedAt: '2018-11-10T13:12:54.000Z'
blobs:
  - filename: update-array.js
    code: |-
      const arr = [1, 2, 3];
      const newArr = Array.from({ ...arr, 1: 3, length: arr.length });
      console.log(newArr); // [1, 3, 3]
    language: js
  - filename: spread-array.js
    code: |-
      const arr = [1, 2, 3];
      const newObj = { ...arr };
      console.log(newObj); // {0: 1, 1: 2, 2: 3}
    language: js
  - filename: spread-update.js
    code: |-
      const arr = [1, 2, 3];
      const newObj = { ...arr, 1: 3 };
      console.log(newObj); // {0: 1, 1: 3, 2: 3}
    language: js
commits:
  - committedAt: '2018-11-10T18:06:17.000Z'
    description: Update Array Hack
    blobs:
      - filename: update-array.js
        code: |-
          const arr = [1, 2, 3];
          const newArr = Array.from({ ...arr, 1: 3, length: arr.length });
          console.log(newArr); // [1, 3, 3]
        language: js
      - filename: spread-array.js
        code: |-
          const arr = [1, 2, 3];
          const newObj = { ...arr };
          console.log(newObj); // {0: 1, 1: 2, 2: 3}
        language: js
      - filename: spread-update.js
        code: |-
          const arr = [1, 2, 3];
          const newObj = { ...arr, 1: 3 };
          console.log(newObj); // {0: 1, 1: 3, 2: 3}
        language: js
  - committedAt: '2018-11-10T18:04:34.000Z'
    description: Update Array Hack
    blobs:
      - filename: update-array.js
        code: |-
          const arr = [1, 2, 3];
          const newArr = Array.from({ ...arr, 1: 3, length: arr.length });
          console.log(newArr); // [1, 3, 3]
        language: js
      - filename: spread-array.js
        code: |-
          const arr = [1, 2, 3];
          const newObj = { ...arr };
          console.log(newObj); // {0: 1, 1: 2, 2: 3}
        language: js
  - committedAt: '2018-11-07T16:50:36.000Z'
    description: Update Array Hack
    blobs:
      - filename: update-array.js
        code: |-
          const arr = [1, 2, 3];
          const newArr = Array.from({ ...arr, 1: 3, length: arr.length });
          console.log(newArr); // [1, 3, 3]
        language: js
  - committedAt: '2018-11-07T16:47:42.000Z'
    description: Update Array Hack
    blobs:
      - filename: update-array.js
        code: |-
          const arr2 = [1, 2, 3];
          const newArr2 = Array.from({ ...arr, 1: 3, length: arr.length });
          console.log(newArr2); // [1, 3, 3]
        language: js
---

