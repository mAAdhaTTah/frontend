---
description: pipe-dom
status: publish
gistId: ''
sync: false
createdAt: '2019-07-13T16:46:52.000Z'
updatedAt: '2019-07-15T14:51:18.000Z'
blobs:
  - filename: example.js
    code: |-
      import { query, addClass, append, on } from 'pipe-dom';

      query('ul')
        |> addClass('important-list')
        |> append(
          document.createElement('li')
            |> addClass('important-item')
            |> on('click', () => console.log('item clicked'))
      )
    language: js
commits:
  - committedAt: '2019-07-15T18:51:18.000Z'
    description: pipe-dom
    blobs:
      - filename: example.js
        code: |-
          import { query, addClass, append, on } from 'pipe-dom';

          query('ul')
            |> addClass('important-list')
            |> append(
              document.createElement('li')
                |> addClass('important-item')
                |> on('click', () => console.log('item clicked'))
          )
        language: js
  - committedAt: '2019-07-13T20:46:52.000Z'
    description: pipe-dom
    blobs:
      - filename: example.js
        code: |-
          import { query, addClass, append } from 'pipe-dom';

          query('ul')
            |> addClass('important-list')
            |> append(
              document.createElement('li')
                |> addClass('important-item')
                |> on('click', () => console.log('item clicked'))
          )
        language: js
---

