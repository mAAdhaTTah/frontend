---
title: Solving developer friction when using Redux & Vuex
publishedAt: '2022-02-28T01:11:27.000Z'
updatedAt: '2022-02-28T01:11:27.000Z'
menu: content/menus/main.md
header: content/headers/main.md
status: draft
body:
  - content: >
      I've used Redux on a couple of small- to medium-sized applications, and
      while its been the inspiration for other solutions, it's got its own flaws
      and issues. I'm always interested in seeing what other methods of solving
      this problem are out there. I'm working on a [Vue.js](vuejs.org)
      application, so it made sense to try out the state management solution
      blessed by the developers behind the library.


      The documentation for Vuex is solid, and it's been easy to understand what
      the library is doing. Because it's tied to Vue.js, the documentation
      provides a suggested application structure. The suggested application
      structure wraps pieces by "types", which is common (see Rails, Laravel,
      etc.). While I still favor that structure, the Redux community has been
      looking seriously at the
      ["Ducks"](https://medium.com/@scbarrus/the-ducks-file-structure-for-redux-d63c41b7035c)
      pattern. Vuex adopts parts of the Ducks pattern with `modules`,
      self-contained functions that manage subsection of the state.


      The issue I have with that pattern is it ties actions to the effect it
      produces. You write a button and pass down a callback that dispatches
      `SAVE_USER`, which triggers the API call to the save the user's data. When
      a single action needs to trigger a sequence of side effects, `redux-thunk`
      allows a callback to wrap the entire sequence or `redux-promise` to
      dispatch Promises as action. Both of these solutions essentially couple
      the DOM events to the side effects they produce.


      A Vuex application **can** avoid this problem through the use of a
      container component, the same way `react-redux` uses container components,
      but this isn't how Vuex works by default, and a lot of intermediate wiring
      is required to make that work. When a Vuex application boots, all the
      components have the store provided to them, encouraging components to
      speak directly into the store.


      You have to do a lot of work to keep from getting components too entangled
      with the store, reducing their reusability. `react-redux` solves this by
      using `connect` to define container components, selecting the component's
      state from the store. This keeps the rest of the application from knowing
      anything about it and keeping it cleanly separated and reusable.


      Using modules to make the application fractal is great feature. I also
      love the way Cycle.js fractalizes its design (functions all the way
      down!). With Vuex, though, the benefit is the way it ties the actions to
      state changes, like Redux's reducers.


      The problem I have with both of these setups is it ultimately ties actions
      to their effects. Either you're calling into the store from your Vue
      component or you're threading callbacks through your React components. A
      component low in the hierarchy gets passed its action dispatch / side
      effecting functions through several layers, with intermediate layers
      passing along callbacks it doesn't need.
      [`brookjs`](https://valtech-nyc.github.io/brookjs/) forces components to
      be a stream of actions, encouraging them to decouple from the state
      changes they trigger. Component events emit actions, and Redux reducers
      respond to those events, the inverse of what Vuex encourages.


      In `brookjs`, as you compose components together, you map actions from
      their generic children events to more specific events based on the
      component's context. This eliminates the need to thread callbacks down the
      way you do in React, allowing you to fully understand the component and
      its context without needing to know what callbacks the parent passes into
      it.


      Each part of the application merely emits events when something inside of
      that section happens. They never emit events indicating what they want to
      have happen. It's up to other parts of the application to respond to those
      events appropriately.


      The reducer doesn't need to know where the actions come from, and the
      components don't have to know what the action does. This makes actions
      themselves reusable as well, as they're the intermediary between those two
      parts of the application. We handle side effects by responding to these
      actions directly in other parts of the application. This encourages
      actions to represent their source, and makes actions more reusable as a
      result.


      Does this make sense? Have you run into the problem using React or Vue?


      ***


      *Addendum:* I've been looking at
      [redux-loop](https://github.com/redux-loop/redux-loop). I like the idea of
      the reducer being responsible for dispatching the action that indicates
      the side effect, or even using `Cmd.run` to bootstrap a new delta. This
      would have the result of putting more of the business logic of the
      application into the reducer.
    _template: richText
excerpt: >
  I’ve used Redux on a couple of small- to medium-sized applications, and while
  its been the inspiration for other solutions, it’s got its own flaws and
  issues. I’m always interested in seeing what other methods of solving this
  problem are out there. I’m working on a Vue.js application, so it made sense
  to try out \[…]
featuredMedia: null
categories:
  - reference: content/categories/web-development.md
_template: standard
---


