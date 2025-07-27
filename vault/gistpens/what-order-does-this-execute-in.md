---
tags:
  - web
  - snippet
title: What Order Does This Execute In?
description: ""
slug: gistpens/what-order-does-this-execute-in
published_at: 2018-05-31T11:32:15.000Z
updated_at: 2018-05-31T11:32:15.000Z
share: true
---

```js title="promises.js"
setTimeout(() => {
  console.log("inside timeout");
}, 0);

process.nextTick(() => {
  console.log("inside nextTick");
});

const p = new Promise(function (resolve, reject) {
  console.log("inside promise");

  resolve();
}).then(() => console.log("inside then"));

console.log("after promise");
```

^promises-js
