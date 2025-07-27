---
tags:
  - web
  - snippet
title: useEffect dependency array issues
description: ""
slug: gistpens/useeffect-dependency-array-issues
published_at: 2020-07-03T13:31:45.000Z
updated_at: 2020-07-03T13:34:17.000Z
share: true
---

```js title="useEffect-issue.js"
useEffect(() => {
  refreshCart();
}, []);
```

^useEffect-issue-js

```js title="refreshCart.js"
const refreshCart = () => api.getCart().then((cart) => setState(cart));
```

^refreshCart-js

```js title="refreshCart-useCallback.js"
const refreshCart = useCallback(
  () => api.getCart().then((cart) => setState(cart)),
  [],
);
```

^refreshCart-useCallback-js

```js title="refreshCartRef.js"
const refreshCartRef = useRef(null);

if (!refreshCartRef.current) {
  refreshCartRef.current = () => api.getCart().then((cart) => setState(cart));
}

useEffect(() => refreshCartRef.current(), []);
```

^refreshCartRef-js

```js title="refreshCart-eslint-disable.js"
useEffect(() => {
  refreshCart();
  // refreshCart is recreated fresh, but we only want to
  // do this on initial render, so we're going to provide
  // an empty array here so it only runs once.
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);
```

^refreshCart-eslint-disable-js
