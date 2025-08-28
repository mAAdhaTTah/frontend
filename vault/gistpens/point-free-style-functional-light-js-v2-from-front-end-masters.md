---
tags:
  - web
  - snippet
title: Point-Free Style - Functional Light JS v2 from Front-End Masters
description: ""
slug: gistpens/point-free-style-functional-light-js-v2-from-front-end-masters
published_at: 2017-12-03T10:27:59.000Z
updated_at: 2017-12-03T10:28:25.000Z
share: true
---

```js title="problem.js"
function output(txt) {
  console.log(txt);
}

function printIf(predicate) {
  return function (msg) {
    if (predicate(msg)) {
      output(msg);
    }
  };
}

function isShortEnough(str) {
  return str.length <= 5;
}

function isLongEnough(str) {
  return !isShortEnough(str);
}

var msg1 = "Hello";
var msg2 = msg1 + " World";

printIf(isShortEnough)(msg1); // Hello
printIf(isShortEnough)(msg2);
printIf(isLongEnough)(msg1);
printIf(isLongEnough)(msg2); // Hello World
```

^problem-js

```js title="point-free.js"
const output = console.log.bind(console);
const when = (func) => (pred) => (val) => {
  if (predicate(val)) {
    func(val);
  }
};
const not = (func) => (val) => !func(val);
const printIf = when(output);
const isShortEnough = (str) => str.length <= 5;
const isLongEnough = not(isShortEnough);
```

^point-free-js
