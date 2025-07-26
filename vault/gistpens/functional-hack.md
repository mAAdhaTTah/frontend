---
tags:
  - web
  - snippet
title: Functional Hack
description: ""
slug: gistpens/functional-hack
published_at: 2021-08-15T14:58:51.000Z
updated_at: 2021-09-12T22:23:44.000Z
share: true
---

```js title="add.js"
const add = (a) => (b) => a + b;
add(1)(2); // 3
```

^add-js

```js title="doubleThenAdd2.js"
const doubleThenAdd2 = pipe(multiply(2), add(2));
doubleThenAdd2(5); // 12
```

^doubleThenAdd2-js

```js title="addCallNormal.js"
add(1, 2); // b => 1 + b;
```

^addCallNormal-js

```js title="curriedAdd.js"
const add = curry((a, b) => a + b);
add(1); // b => 1 + b;
add(1, 2); // 3
add(1)(2); // 3
```

^curriedAdd-js

```js title="sort.js"
const sort = (arr, algo = 'bubble') => // ... implementation
```

^sort-js

```js title="api.js"
const api = (
  { url, method = "GET", body = {}, headers = {} }, // ...
) => implementation;
```

^api-js

```js title="sortCurried.js"
const sort = curry((algo, arr) => // ... implementation );
sort('bubble', [5, 214, 23, 6]); // [5, 6, 23, 213]
const sortBubble = sort('bubble');
```

^sortCurried-js

```js title="doubleThenAdd2Fsharp.js"
const doubleThenAdd2 = (x) => x |> multiply(2) |> add(2);
```

^doubleThenAdd2Fsharp-js

```js title="doubleThenAdd2Hack.js"
const doubleThenAdd2 = x => x |> multiply(2, ^) |> add(2, ^);
```

^doubleThenAdd2Hack-js

```js title="doubleThenAdd2HackNoFunc.js"
const doubleThenAdd2 = x => x |> 2 * ^ |> 2 + ^;
```

^doubleThenAdd2HackNoFunc-js

```js title="curriedWithHack.js"
// Without `curry`
1 |> add(1)(%);
// With `curry`
1 |> add(1, %);
```

^curriedWithHack-js

```js title="deepSetRecord.js"
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
```

^deepSetRecord-js
