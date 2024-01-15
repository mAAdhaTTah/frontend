---
title: 'pipe-dom: DOM manipulation with the F#-style pipeline operator'
publishedAt: '2019-07-15T18:06:18.000Z'
updatedAt: '2019-07-15T18:50:40.000Z'
menu: content/menus/main.md
header: content/headers/main.md
status: publish
body:
  - content: >
      Last week, Babel released version
      [7.5.0](https://babeljs.io/blog/2019/07/03/7.5.0), which included our
      implementation of the [F#-style pipeline
      operator](https://github.com/valtech-nyc/proposal-fsharp-pipelines). If
      you're not already aware, TC39 is exploring the potential of a pipeline
      operator in JavaScript. You can learn more about what's going on with the
      operator
      [here](https://babeljs.io/blog/2018/07/19/whats-happening-with-the-pipeline-proposal).
      At this point, we've got all 3 proposals in Babel, so the next step is to
      start getting feedback on them. To help with that, I've put together a
      small DOM manipulation library,
      [`pipe-dom`](https://github.com/mAAdhaTTah/pipe-dom), for the
      newly-released F#-style pipeline operator.


      When new developers start learning JavaScript, they often start with
      jQuery. One of jQuery's defining characteristics is its fluent API, which
      allows you to write clear, concise code when making a series of DOM
      modifications. The major downside to this API style is all of these
      methods need to be attached to the jQuery object, which means the entire
      library needs to be loaded to be usable. Minified and gzipped, jQuery is
      ~30KBs, which is a lot to include if you're just trying to toggle classes.


      With the introduction of modules to JavaScript, bundlers are able to
      analyze what's used in a project and remove unused functions, a process
      called [tree-shaking](https://webpack.js.org/guides/tree-shaking/).
      `pipe-dom` takes jQuery's fluent API and combines it with the pipeline
      operator, allowing users to import the exact DOM methods they want and let
      bundlers remove the rest. Here's what that might look like:

    _template: richText
  - repo: content/repos/pipe-dom.md
    blob: example.js
    highlight: ''
    offset: 0
    _template: gistpenEmbed
  - content: >

      With this, your bundler can include just the code for `query`, `addClass`,
      `append` and `on`, and discard the rest of the library.


      I've included a small API initially to get the idea out there, but I'm
      very interested in expanding it, so please [open an
      issue](https://github.com/mAAdhaTTah/pipe-dom/issues/new) and suggest
      ideas! I'm very open to expanding the API and evolving the library along
      with pipeline operator best practices.


      [Check it out](https://github.com/mAAdhaTTah/pipe-dom) and [let me know
      what you think](https://twitter.com/JamesDiGioia)!
    _template: richText
excerpt: >
  Last week, Babel released version 7.5.0, which included our implementation of
  the F#-style pipeline operator. If you’re not already aware, TC39 is exploring
  the potential of a pipeline operator in JavaScript. You can learn more about
  what’s going on with the operator here. At this point, we’ve got all 3
  proposals in Babel, so the \[…]
featuredMedia: content/media/pipe-dom-usage-example.md
categories:
  - reference: content/categories/web-development.md
_template: standard
---
