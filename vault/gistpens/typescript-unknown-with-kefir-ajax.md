---
tags:
  - web
  - snippet
title: TypeScript unknown with kefir-ajax
description: ""
slug: gistpens/typescript-unknown-with-kefir-ajax
published_at: 2020-07-03T11:57:29.000Z
updated_at: 2020-07-03T12:03:36.000Z
share: true
---

```typescript title="validate.ts"
ajax$(...)
  .flatMap(response => response.json())
  .flatMap(body => // body is `unknown`
    ResponseType.decode(body).fold<Observable<ResponseType, t.Error>>(
      Kefir.constantError,
      Kefir.constant,
    )
  )
```

^validate-ts
