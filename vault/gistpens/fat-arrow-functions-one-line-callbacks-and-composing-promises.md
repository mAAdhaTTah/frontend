---
tags:
  - inbox
  - web
  - snippet
title: Fat Arrow Functions, One-Line Callbacks, and Composing Promises
description: ""
slug: gistpens/fat-arrow-functions-one-line-callbacks-and-composing-promises
published_at: 2015-12-22T11:20:17.000Z
updated_at: 2015-12-22T11:20:17.000Z
share: true
---

```js title="old-style.js"
doSomething().then(function (value) {
  return value.prop;
});
```

^old-style-js

```js title="new-style.js"
doSomething().then((value) => value.prop);
```

^new-style-js

```js title="composing-promises.js"
doSomething()
  .then((value) => value.asyncMethod())
  .then((asyncMethodValue) => asyncMethodValue.prop);
```

^composing-promises-js
