---
publishedAt: '2019-12-19T03:24:11.000Z'
updatedAt: '2022-12-04T20:42:58.000Z'
status: publish
body:
  - content: >
      I think not using snapshots makes the test-as-documentation much clearer.
      It explains what the developer was attempting to check with a given
      snapshot vs a more hand-wavey "it looks like this." This is particularly
      important if you want to assert snapshots in the middle of your tests /
      after changes, because then it's a lot less clear what's actually
      important. If you have a form that's supposed to display error messages
      after attempting to submit invalid values. asserting against those
      messages specifically is much clearer than a snapshot.


      One of the positives of "deep" snapshot testing is if a widely used
      component changes, all of the snapshot tests from all of the components
      that use it will also fail, which tells you which components to look at
      when checking to see if it still displays correctly.
    _template: richText
_template: status
---

