---
title: '[RFC]: JSX-based approach for brookjs components'
publishedAt: '2018-01-09T16:34:23.000Z'
updatedAt: '2019-07-16T03:23:38.000Z'
menu: content/menus/main.md
header: content/headers/main.md
status: publish
body:
  - content: >
      #### Status: Withdrawn


      *We're attempting to implement an API like this on top of React, instead
      of in a separate library.*


      `brookjs` was originally designed to be backed with a Handlebars-based
      templating engine, providing a clean separation between what constitutes
      structure (HTML in the Handlebars template), interaction (JavaScript
      component declaration), & style (CSS files). Using Handlebars to back
      components allows them to be rendered by any backend, no JavaScript
      required. The display of the DOM is expressed as a Handlebars template,
      and behavior is mapped from the template to the component's configuration
      through Handlebars helpers.


      While this approach for writing components is common (this is not unlike
      `Backbone.Events`), using a templating language like Handlebars limits
      what we can feasibly do with a component. A JSX-based approach would allow
      the developer to express her view of the DOM over time through Observables
      and expose the full power of JavaScript to do so, rather than being
      limited by what the templating language affords. Specifically, this could
      enable:


      1. static typechecking of our components, including `props$`

      2. simplified data flow down into child components

      3. CSS-in-JS solutions for styling

      4. stateful components with embedded reducers


      This post lays out the initial JSX-based API for components.


      ## Mental Model: Membrane Controlling Data Flow


      The idea now is to think of a component as an expression of how data flows
      into and out of a particular section of the DOM. It's a membrane around
      the stateful DOM contents within it, ensuring that any changes made to
      what's inside is controlled and protected by Observables and the pure
      functions that interact with them.


      Testing a component thus entails pushing data and events through the
      membrane and ensuring the right values come out. We can push props into
      the component, do snapshot testing with the resulting element, and verify
      the correct effects were emitted, and fire events against that section of
      the DOM and verify the correct actions were emitted. This would cover the
      full behavior of the component. Combining that with Storybook-based
      screenshot test workflow would provide a solid testing experience for
      `brookjs` components.


      ## Changes Expressed as Observables


      This is our first component, and highlights the first two APIs we'll move
      into JSX:


      \[gistpen id="5418"]


      The first thing to note is the text of the element is expressed a stream
      embedded in the JSX. Any changes in the element **must** be expressed as
      an embedded Observable. The render function is only called once and passed
      the stream of `props$` for  the component.


      The second thing is events are now expressed as `onX` attributes, which
      take functions. These functions are called with a stream of `event$`,
      which are the same functions passed into the current `events` helper, so
      there's no change in the logic when converting to JSX. Backwards
      compatibility will be maintained by migrating the current Handlebars-based
      attributes to the new style at runtime.


      Note that we're no longer using the `render` helper function in the above
      example. We'll determine whether this is a new-style or old-style
      component based on whether it's using the old helper functions. We can
      deprecate those helper functions when (and if!) we deprecate the
      handlebars-based mechanism for rendering components (discussed below).


      ## Dealing with Attributes & Children Components


      This is an example of a component using a child component:


      \[gistpen id="5463"]


      Even attributes on a component **must** be expressed as an Observable.
      Again, *anything dynamic **must** be expressed as an Observable*. This
      allows the developer to optimize rendering at a very granular level.
      Individual attributes can be `filter`ed, and `skipDuplicates` becomes a
      version of React's `shouldComponentUpdate`, but instead of needing a
      single function to account for the entire component, we can write a
      function for each individual change in a component.


      Child components look similar to React, but instead of being passed
      individual props, they'll be provided a stream of `props$` based on the
      parent's `props$`. In the previous version, we had a hook for this,
      `modifyChildProps`, but because the render context was handled through
      Handlebars, it wasn't actually that useful. This makes the idea intended
      by `modifyChildProps` easily expressed in the `render` function.


      ## Lists of Children


      Similar to React, an Observable can return an array of elements, so a
      `props$` stream can be mapped to an array of children components to embed
      a list in the JSX:


      \[gistpen id="5462"]


      As described in the comment, the `todos` passed into the `TodoList`
      component is an object containing an `order` key and a `dict` key. The
      `order` is an array of keys which indicate the order the todos appear in.
      The `dict` key is an object that holds all the key / value pairs of the
      given todo. These two combined provide a mechanism for rendering lists of
      components. This is ideal because searching through an array for the
      correct instance based on a property in an array of items could hurt
      performance with a large array.


      `key` works the same way it does with React. It indicates a unique
      instance of a component. This ensures that should a component be
      rearranged, the correct instance is moved to the new location.


      `preplug` is a hook into the child component's instance before it get
      plugged into the parent component which allows the developer to modify
      child actions and contextualize them. This allows small child components
      to emit generic, reusable actions while the parent components modify them
      based on where they come from. This is also currently doable with the
      current Handlebars-based API.


      This doesn't have to be done manually; we will provide an iteration helper
      to do this for you as well as cache the stream for a given component, but
      even that case should provide a stream of `order` / `dict` objects. That
      would simplify list rendering to this:


      \[gistpen id="5487"]


      The parent component is thus responsible only for putting the child
      component in the right order in the list, while the child component takes
      its stream of `props$` and updates itself in response to its values.


      ## Bootstrapping the Application


      While we'd maintain the component-as-function approach for backwards
      compatibility, we'd like to move to an external function to mount the
      component in order to enable custom renderers, the same way React does. We
      could probably borrow some ideas from
      [Ink](https://github.com/vadimdemedes/ink) for a custom CLI renderer and
      update `brookjs-cli` to use it.


      To those ends, we could update the application bootstrapping step to look
      like this:


      \[gistpen id="5464"]


      This makes the application startup look functionally similar to React,
      except the `mount` function returns an Observable. Running `observe`,
      binding the view to the store, starts up the application.


      To some extent, this breaks the
      [architecture](https://jamesdigioia.s3.amazonaws.com/uploads/2017/12/architecture.png),
      as the view is now "special", rather than just another delta where
      side-effects occur, but it's more idiomatic in the React community.


      If the `domDelta` is currently in use, then no modifications need to be
      made. Bootstrapping would continue to look like this:


      \[gistpen id="5498"]


      This is how `brookjs-cli` currently scaffolds a new app, so we might not
      need to change much in userland to ensure backwards compatibility. This is
      also basically how `brookjs-cli` bootstraps itself, so there's decent
      precedent that this works. Under the hood, the `domDelta` can use the new
      `mount` function without breaking any backwards compatibility. We can also
      write other delta functions around other view compatibility layers.


      ## Backwards Compatibility for Current Components


      For now, backwards compatibility will be maintained through the old helper
      functions, which indicate Handlebars-style components. New components will
      just pass in an object of functions directly, and the `component` function
      will map the functions to the various lifecycle hooks. They also become an
      easy target for deprecation if we decide to remove support for
      Handlebars-based components.


      ### Deprecate Handlebars?


      We gain two advantages by getting rid of Handlebars:


      1. If a user isn't using Handlebars components, the `parse` step is loaded
      for no reason, expanding the bundle size unnecessarily.

      2. If a user is using Handlebars, the `parse` function is a performance
      bottleneck which can be better optimized through JSX-based components.


      The only way to eliminate both these problems is to build a vdom-backed
      Handlebars implementation, which is not a trivial effort. We also have to
      maintain two compatibility layers, which is both extra code and extra
      overhead, as we also have to run and maintain tests for both types of
      components to ensure they both continue to work as expected. There isn't
      enough bandwidth to implement both a JSX-based & a Handlebars-based
      component system.


      If the Handlebars implementation is doomed to be an inferior experience,
      does it make sense to deprecate it over the next few versions, as the JSX
      implementation comes online?


      ### Upgrade Path


      A Handlebars component can be upgraded to a JSX component by copying &
      pasting the Handlebars template into `render`, and replacing all of the
      mustache tags, helpers, & partials with Observables derived from the
      passed in `props$` stream. Logic can be moved from their current locations
      as configuration to inline in the JSX. Logic won't have to change.
      Userland tests should continue to function as they do currently, and we
      will introduce some test helpers to simplify testing and support both
      snapshot and screenshot testing.


      ## Alternative to JSX: Handlebars-based vdom


      The alternative is to continue in the current direction. Work has already
      begun on the Handlebars-to-vdom parser, but supporting the entire spec
      will also take time, so both streams can't be pursued in parallel. Spec
      tests are available and we'll be working to ensure compliance with all of
      it. The main benefit of a Handlebars-based approach is that it's possible
      to do server-side rendering without a Node- or JavaScript-based back-end,
      but that requires full compliance with the Handlebars spec in order to
      ensure interop. Switching to JSX would deny us this advantage, requiring
      JavaScript to be executed in order to generate HTML from a component.


      Is server-side rendering worth what we'd gain with a JSX-based approach?


      #### Why Not Build on React? (Prior Art)


      The design of the API was inspired by two projects that enable embedding
      Observables into React components:


      * [calmm/karet](https://github.com/calmm-js/karet)

      * [@grammerly/focal](https://github.com/grammarly/focal/)


      Both of these wrap React components into "lifted" React components that
      accept Observables as React children. It then wraps those children to
      update when the Observable emits a new value. The syntax you find in these
      examples matches much of what we'd like to do with `brookjs`.


      Both of these are solid solutions. If you're already using `react-redux`,
      you can integrate karet and our `observeDelta` to start using Observables
      throughout your application. If you're already using RxJS, focal and
      [redux-observable](https://redux-observable.js.org/) would be a reasonable
      combination as well, and would give you access to the full React
      ecosystem.


      In order to fulfill the full API presented above, we won't be able to rely
      on React because the design conflicts with two areas we'd like to enable:


      1. Declaring events as functions of Observables, and thus returning an
      Observable when mounting, would either be invasive or require writing a
      custom React reconciler, which would be difficult to impossible to fully
      support the ecosystem while enabling this feature.

      2. Declaring effects as Observables. The current implementation of
      `modifyEffect$$` provides a low-level hook into the rendering process, and
      this will probably not be implementable on top of React, which has its own
      rendering process, Fiber.


      Because of these two goals of `brookjs`, we probably can't build on top of
      React, although investigation will continue in this area to see if it's
      feasible.
    _template: richText
excerpt: >
  Status: Withdrawn We’re attempting to implement an API like this on top of
  React, instead of in a separate library. brookjs was originally designed to be
  backed with a Handlebars-based templating engine, providing a clean separation
  between what constitutes structure (HTML in the Handlebars template),
  interaction (JavaScript component declaration), & style (CSS files). Using
  Handlebars \[…]
featuredMedia: null
categories:
  - reference: content/categories/web-development.md
_template: standard
---


