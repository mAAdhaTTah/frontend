---
tags:
  - web
  - snippet
title: userAgent checking
description: ""
slug: gistpens/useragent-checking
published_at: 2015-02-14T18:39:11.000Z
updated_at: 2015-02-14T18:39:11.000Z
share: true
---

```js title="user-agent.js"
// Source: https://github.com/pixelcog/parallax.js/blob/master/parallax.js#L96
if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
  // if iOS
}

if (navigator.userAgent.match(/(Android)/)) {
  // if Android
}
```

^user-agent-js
