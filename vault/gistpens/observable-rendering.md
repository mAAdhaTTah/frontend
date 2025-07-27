---
tags:
  - web
  - snippet
title: Observable Rendering
description: ""
slug: gistpens/observable-rendering
published_at: 2016-11-02T23:30:34.000Z
updated_at: 2017-10-12T21:51:07.000Z
share: true
---

```js title="component.js"
import Kefir from "kefir";

export default function EditorComponent(el, props$) {
  const keyup$ = Kefir.fromEvents(el, "keyup");
  const keydown$ = Kefir.fromEvents(el, "keydown");

  return props$
    .sampledBy(keyup$.debounce(150))
    .flatMapLatest((props) => createRenderStream(props).takeUntil(keydown$));

  function createRenderStream(props) {
    return Kefir.stream((emitter) => {
      const loop = requestAnimationFrame(() => {
        // Update the element
        emitter.end();
      });

      return () => cancelAnimationFrame(loop);
    });
  }
}
```

^component-js
