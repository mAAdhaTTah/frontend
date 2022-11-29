---
description: TypeScript unknown with kefir-ajax
status: publish
gistId: ''
sync: false
createdAt: '2020-07-03T11:57:29.000Z'
updatedAt: '2020-07-03T12:03:36.000Z'
blobs:
  - filename: validate.js
    code: |-
      ajax$(...)
        .flatMap(response => response.json())
        .flatMap(body => // body is `unknown`
          ResponseType.decode(body).fold<Observable<ResponseType, t.Error>>(
            Kefir.constantError,
            Kefir.constant,
          )
        )
    language: typescript
commits:
  - committedAt: '2020-07-03T16:03:36.000Z'
    description: TypeScript unknown with kefir-ajax
    blobs:
      - filename: validate.js
        code: |-
          ajax$(...)
            .flatMap(response => response.json())
            .flatMap(body => // body is `unknown`
              ResponseType.decode(body).fold<Observable<ResponseType, t.Error>>(
                Kefir.constantError,
                Kefir.constant,
              )
            )
        language: typescript
  - committedAt: '2020-07-03T15:57:29.000Z'
    description: TypeScript unknown with kefir-ajax
    blobs:
      - filename: validate.js
        code: |-
          ajax$(...)
            .flatMap(response => response.json())
            .flatMap(body => // body is `unknown`
              ResponseType.decode(body).fold<Observable<ResponseType, t.Error>>(
                Kefir.constantError,
                Kefir.constant,
              )
            )
        language: js
---

