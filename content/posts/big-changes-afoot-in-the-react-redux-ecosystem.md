---
title: Big changes afoot in the React/Redux ecosystem
publishedAt: '2018-02-05T15:07:44.000Z'
updatedAt: '2018-02-05T15:07:44.000Z'
menu: content/menus/main.md
header: content/headers/main.md
status: publish
body:
  - content: >
      If you're using React and / or Redux, you should be aware of two major
      changes coming soon in each of those libraries.


      First, [Redux just released
      v4.0.0-beta.1](https://github.com/reactjs/redux/releases/tag/v4.0.0-beta.1).
      There doesn't appear to be any major changes breaking changes unless you
      were using some of the types Redux is no longer exporting. There are also
      some additional checks and errors around dispatching too early in
      middleware, so it should solve a common pitfall when setting up
      middleware. It's a problem I've experienced a few times when using
      `brookjs` and it's why we recommend dispatching an `INIT` action after the
      application is bootstrapped.


      In addition to the upcoming change in Redux, React has seen some major
      changes as well. First, the new Context API was
      [proposed](https://github.com/reactjs/rfcs/pull/2) and
      [landed](https://github.com/facebook/react/pull/11818), the first major
      change using React's new RFC process. The Context API has always been
      considered somewhat experimental, although it's been used widely by a
      number of libraries, including
      [react-redux](https://github.com/reactjs/react-redux) and
      [react-router](https://github.com/ReactTraining/react-router), and the
      current implementation ran into a number of challenges. The biggest is
      `shouldComponentUpdate` will tell React that none of the elements of a
      given hierarchy has changed. If a component in that hierarchy would change
      as a result of a change in context, that change isn't able to propagate
      down the tree.


      The new API uses higher-order components to set and provide a Context. It
      uses a render function as a prop to provide the value of the Context,
      giving the context Provider control over when its dependents render. It's
      currently behind a feature flag, which means it may not be available to
      you in your regular applications just yet. Once it comes out from behind
      that flag, you'll be able to use Context in your applications, knowing
      that this is a stable API you can rely on.


      More importantly, though, React continues pushing towards async-rendering
      by [**deprecating all of the `componentWill*` lifecycle
      methods**](https://github.com/reactjs/rfcs/pull/6). The reason for this
      major change is they've found these lifecycle methods could be potentially
      unsafe in an async world, so they're suggesting moving most of the logic
      previously implemented in the methods to either `componentDid*` or the
      `render` method itself. They'll be introducing new versions of these
      methods prefixed with `UNSAFE_*`, so it's very clear that these methods
      could cause problems in an async world.


      One of the major use cases for `componentWillMount` in particular is to
      run logic on the server, as `componentDidMount` never runs on the server.
      They'll be introducing a separate lifecycle hook for server-rendering only
      where that logic could live. Otherwise, any logic that currently lives in
      `componentWill*` should move to either the corresponding `componentDid*`
      or `render` itself.


      This is going to have a major impact on the community, Facebook's "move
      fast and break things" applied to open source, but the overall goal is
      laudable. React is ultimately moving towards an async-rendering world, and
      while the initial
      [Fiber](https://github.com/acdlite/react-fiber-architecture)
      implementation makes async rendering possible, more work needs to be done
      in order to fully enable it. Unfortunately, it looks like there's still a
      lot more upheaval in the ecosystem to come before we get there.


      A codemod is planned for application developers, so it should (hopefully)
      be less painful for apps to make the switch. Lbirary authors are likely to
      be hit hardest. I'm already looking at what changes are required in order
      to get `brookjs` working with async rendering, as we definitely use some
      of the now-deprecated lifecycle hooks. We'll see if this turns out to be
      difficult.
    _template: richText
excerpt: >
  If you’re using React and / or Redux, you should be aware of two major changes
  coming soon in each of those libraries. First, Redux just released
  v4.0.0-beta.1. There doesn’t appear to be any major changes breaking changes
  unless you were using some of the types Redux is no longer exporting. There
  are also some \[…]
featuredMedia: content/media/react-fiber.md
categories:
  - reference: content/categories/web-development.md
tags:
  - reference: content/tags/fiber.md
  - reference: content/tags/javascript.md
  - reference: content/tags/react.md
_template: standard
---


