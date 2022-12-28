---
publishedAt: '2017-08-07T19:57:17.000Z'
updatedAt: '2017-08-07T19:58:16.000Z'
status: publish
body:
  - content: >
      Quick Vue tip: lifecycle methods `update` & `beforeUpdate` will not be
      called if the props that changed for a component aren't being used to
      render. In my case, I was using a prop not used by the render method to
      trigger some side effect, and couldn't get the callback to trigger the
      side effect. Use `this.$watch` to watch prop changes unrelated to a Vue
      component's rendering.
    _template: richText
_template: status
---

