---
description: Pointed vs. Point-Free JavaScript
status: publish
gistId: ''
sync: false
createdAt: '2018-06-13T20:25:15.000Z'
updatedAt: '2018-06-13T20:25:15.000Z'
blobs:
  - filename: point-free-action.js
    code: |-
      const elementToCursorMoveAction = R.converge(
          R.unapply(editorCursorMoveAction),
          [selectSelectionStart, selectSelectionEnd]
      );
    language: js
  - filename: pointed-action.js
    code: |-
      const elementToCursorMoveAction = e =>
          editorCursorMoveAction([selectSelectionStart(e), selectSelectionEnd(e)]);
    language: js
commits:
  - committedAt: '2018-06-14T00:25:15.000Z'
    description: Pointed vs. Point-Free JavaScript
    blobs:
      - filename: point-free-action.js
        code: |-
          const elementToCursorMoveAction = R.converge(
              R.unapply(editorCursorMoveAction),
              [selectSelectionStart, selectSelectionEnd]
          );
        language: js
      - filename: pointed-action.js
        code: |-
          const elementToCursorMoveAction = e =>
              editorCursorMoveAction([selectSelectionStart(e), selectSelectionEnd(e)]);
        language: js
  - committedAt: '2018-06-14T00:24:36.000Z'
    description: Pointed vs. Point-Free JavaScript
    blobs:
      - filename: point-free-action.js
        code: |-
          R.converge(
              R.unapply(editorCursorMoveAction),
              [selectSelectionStart, selectSelectionEnd]
          );
        language: js
      - filename: pointed-action.js
        code: ''
        language: js
---

