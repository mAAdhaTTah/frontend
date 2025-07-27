---
tags:
  - web
  - snippet
title: flatten two ways
description: ""
slug: gistpens/flatten-two-ways
published_at: 2018-04-15T22:04:56.000Z
updated_at: 2018-04-17T19:41:03.000Z
share: true
---

```js title="recursive-flatten.js"
function flatten(source, acc = []) {
  if (source.length === 0) return acc;

  const [head, ...tail] = source;

  return flatten(tail, [
    ...acc,
    ...(Array.isArray(head) ? flatten(head) : [head]),
  ]);
}

console.log(flatten([1, 2, [3, 4, 5, [6, 7], 8, [9]], 10]));
```

^recursive-flatten-js

```js title="point-free-flatten.js"
import * as R from "ramda";

const flatten = R.ifElse(
  R.propSatisfies(R.equals(0), "length"),
  R.flip(R.identity),
  R.converge(
    (source, acc = []) => flatten(source, acc),
    [
      R.tail,
      R.useWith(R.flip(R.concat), [
        R.pipe(
          R.head,
          R.ifElse(Array.isArray, (head) => flatten(head, []), R.of),
        ),
        R.identity,
      ]),
    ],
  ),
);

console.log(flatten([1, 2, [3, 4, 5, [6, 7], 8, [9]], 10], []));
```

^point-free-flatten-js
