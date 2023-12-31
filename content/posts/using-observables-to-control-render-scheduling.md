---
title: Using Observables to Control Render Scheduling
publishedAt: '2016-11-07T17:17:08.000Z'
updatedAt: '2016-11-07T17:17:08.000Z'
menu: content/menus/main.md
header: content/headers/main.md
status: publish
body:
  - content: >
      When I talk to other developers about Observables, it's often hard to
      explain their benefits because on the surface, they just look like
      glorified event emitters, but it's how they *compose* that make handling
      dependencies between async events such a breeze. While working on the code
      snippet editor in [WP-Gistpen](https://github.com/mAAdhaTTah/WP-Gistpen),
      I came across an example that shows how easily Observables handle async
      behavior.


      So here's the setup: building a snippet editor on top of
      [PrismJS](http://prismjs.com/) and borrowing some code from
      [Dabblet](http://dabblet.com/), both from [Lea
      Verou](http://lea.verou.me/), and using [Redux](http://redux.js.org/) as
      an Observable of states, we need to rerender the editor as the text
      changes, keeping the syntax highlighting up to date. We keep the position
      of the cursor and the value of the editor in the Store, allowing the
      reducer to be responsible for the complex logic that handling special text
      editor keystrokes, like enter, tab, etc.


      The issue is rendering the editor requires us to track & reset the cursor,
      as we have to reset the text with the latest from the store and
      rehighlight it. If we do that while the user is typing, we have the
      potential to interrupt her, so we need to delay the render until the user
      is no longer typing. The render itself is scheduled in a
      `requestAnimationFrame`, so if the user types before the next frame, we
      need to cancel the render request and wait until the user stops typing
      again. Otherwise, when the frame renders, the cursor will jump back to the
      position it was at when the render was scheduled.


      So this is the problem we're trying to solve.


      In [`brookjs`](https://valtech-nyc.github.io/brookjs/), a component is
      just a function that takes a DOM element & a stream of `props$` and
      returns a stream of (usually [Flux
      Standard](https://github.com/acdlite/flux-standard-action)) Actions from
      the element. Since we're given an Observable of state, we're able to get
      pretty fine control over exactly when the editor renders.


      I'm using [Kefir](http://rpominov.github.io/kefir/), but the same concepts
      apply any other Observable implementation. Here's how I solved this:

    _template: richText
  - repo: content/repos/observable-rendering.md
    blob: component.js
    highlight: ''
    offset: 0
    _template: gistpenEmbed
  - content: >


      This problem is obviously solvable in a stateful way, with the view being
      responsible for holding onto a reference to the render loop, scheduling it
      in one event callback if a render isn't scheduled and cancelling the
      render on the other if it is. We're not talking about a huge component
      here, so there's no reason to think managing this state would be
      difficult.


      But as this component grows in complexity (and it will), colocating the
      temporal dependencies makes it very easy to reason about how the component
      changes over time. In the above example, how keyup and keydown events
      interact with the render cycle is explicit, rather than bouncing between
      callbacks or methods to see how animations are scheduled and cancelled.
      There's zero chance of accidental cancellations or double renders.


      Side effects, like updating the DOM, are wrapped in a stream, so they can
      be handled asynchonrously and cancelled, if needed. Because an Observable
      comes with its own cleanup code (the function returned at the end of
      `stream`'s callback), when the active Observable is switched, the
      animation frame request for the previous Observable is cancelled, ensuring
      the user isn't interrupted as she types. The `props$` stream has control
      over when the render happens, and `flatMapLatest` ensures only the newest
      Observable is being observed at a time, so as the `props$` emits new
      state, previous renders are also cancelled.


      `brookjs` provides some structure around this paradigm, but underneath,
      this is all that's happening, and it provides some elegant solutions to
      thorny async problems. The canonical example is the autocomplete box,
      sending an AJAX request as a user types and cancelling the previous
      request. This is explained by Jafar Husain in [this great
      talk](https://www.youtube.com/watch?v=XE692Clb5LU).


      Even after writing this article, the editor rendering continued to get
      more complicated, and handling it with Observables allowed me to focus on
      how particular events interacted with the render cycle, without worrying
      about how to manage what was actually *happening* at a given time. Let me
      know if you think the [current
      implementation](https://github.com/mAAdhaTTah/WP-Gistpen/blob/85a392c0e20da87610c0677e25c24ef00cba82b6/client/editor/instance/onMount.js#L196-L273)
      is easy to understand.
    _template: richText
excerpt: >
  When I talk to other developers about Observables, it’s often hard to explain
  their benefits because on the surface, they just look like glorified event
  emitters, but it’s how they compose that make handling dependencies between
  async events such a breeze. While working on the code snippet editor in
  WP-Gistpen, I came across an example \[…]
featuredMedia: content/media/observable-universe-wikimedia.md
categories:
  - reference: content/categories/web-development.md
_template: standard
---
