---
description: Functional Hack
status: publish
gistId: ''
sync: false
createdAt: '2021-08-15T14:58:51.000Z'
updatedAt: '2021-09-12T22:23:44.000Z'
blobs:
  - filename: add.js
    code: |
      const add = a => b => a + b;
      add(1)(2); // 3
    language: js
  - filename: doubleThenAdd2.js
    code: |
      const doubleThenAdd2 = pipe(multiply(2), add(2));
      doubleThenAdd2(5); // 12
    language: js
  - filename: addCallNormal.js
    code: |
      add(1, 2); // b => 1 + b;
    language: js
  - filename: curriedAdd.js
    code: |
      const add = curry((a, b) => a + b);
      add(1); // b => 1 + b;
      add(1, 2); // 3
      add(1)(2); // 3
    language: js
  - filename: sort.js
    code: |
      const sort = (arr, algo = 'bubble') => // ... implementation
    language: js
  - filename: api.js
    code: >
      const api = ({ url, method = 'GET', body = {}, headers = {} }) => // ...
      implementation
    language: js
  - filename: sortCurried.js
    code: |
      const sort = curry((algo, arr) => // ... implementation );
      sort('bubble', [5, 214, 23, 6]); // [5, 6, 23, 213]
      const sortBubble = sort('bubble');
    language: js
  - filename: doubleThenAdd2F#.js
    code: |
      const doubleThenAdd2 = x => x |> multiply(2) |> add(2);
    language: js
  - filename: doubleThenAdd2Hack.js
    code: |
      const doubleThenAdd2 = x => x |> multiply(2, ^) |> add(2, ^);
    language: js
  - filename: doubleThenAdd2HackNoFunc.js
    code: |
      const doubleThenAdd2 = x => x |> 2 * ^ |> 2 + ^;
    language: js
  - filename: curriedWithHack.js
    code: |
      // Without `curry`
      1 |> add(1)(%);
      // With `curry`
      1 |> add(1, %);
    language: js
  - filename: deepSetRecord.js
    code: |
      // From the README, w/ Hack pipe
      const updated = state |> #{
          ...^,
          counters[0].value: 2,
          counters[1].value: 1,
          metadata.lastUpdate: 1584383011300,
      };

      assert(updated.counters[0].value === 2);
      assert(updated.counters[1].value === 1);
      assert(updated.metadata.lastUpdate === 1584383011300);
    language: js
commits:
  - committedAt: '2021-09-13T02:23:44.000Z'
    description: Functional Hack
    blobs:
      - filename: add.js
        code: |
          const add = a => b => a + b;
          add(1)(2); // 3
        language: js
  - committedAt: '2021-09-13T02:23:27.000Z'
    description: Functional Hack
  - committedAt: '2021-08-15T18:58:51.000Z'
    description: Functional Hack
---

