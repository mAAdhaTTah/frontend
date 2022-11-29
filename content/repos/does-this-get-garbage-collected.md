---
description: Does this get garbage collected?
status: publish
gistId: ''
sync: false
createdAt: '2016-03-09T10:38:28.000Z'
updatedAt: '2016-03-09T10:38:28.000Z'
blobs:
  - filename: gc.js
    code: |-
      var el = (function() {
        var templateString = template.render();
        var wrapper = document.createElement('div');
        wrapper.innerHTML = templateString;

        var result = wrapper.firstChild;
        // Zero out the innerHTML to ensure
        // no reference to the resulting node.
        wrapper.innerHTML = '';

        return result;
      })();
    language: js
---

