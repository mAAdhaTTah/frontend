---
title: Top-Level Module Application Architecture
publishedAt: '2021-02-17T15:00:29.000Z'
updatedAt: '2021-02-17T15:00:29.000Z'
menu: content/menus/main.md
header: content/headers/main.md
status: draft
body:
  - content: >
      When you start developing React applications, or JavaScript applications
      generally, it can be difficult to know how to organize your files. Dan
      Abramov's [sage advice](https://react-file-structure.surge.sh/), while
      accurate, doesn't tell you anything about whether what "feels right" is
      going to cause problems down the road. As I've worked with ESModules, I've
      started to develop an effective approach to developing modular JavaScript
      application in React. While you may not agree with all of the principles,
      you main find them useful for developing your own.


      At core, this approach results in you treating every folder in your
      application like an npm module. Every folder directly under your
      application folder (typically `src`) is a module with a cohesive design &
      a defined set of exports. This lends itself to developing a consistent and
      maintainable organizational architecture that can evolve with your
      application and limiting the confusion from lots of deeply-nested,
      cross-module imports.


      In order to maintain a consistent organizational structure, we need a set
      of principles to build on. I only recently fully understood the principles
      I was operating under recently, when I was asked to document my approach
      for my team. None of the principles are particularly original but
      combining them together and enforcing them strictly has worked pretty well
      for me. I call this collection of principles "Top-Level Modules" (TLM),
      because it needs a name and naming things is hard.


      ## Principles of Top-Level Modules


      ### Folders directly nested in your application folder are "modules"


      A "module" is a folder at the top-level of your application folder,
      typically `src`, with a barrel defining its API. These are the top-level
      modules that come together to organize your application.


      ### Every module defines its exports in a barrel


      A "barrel" is an `index.js` file that re-exports from other module files,
      rolling them up so they can be imported from a single location. Modules
      use barrels to define and enforce module boundaries.


      Let's take a look at an example module.
    _template: richText
  - repo: content/repos/top-level-modules.md
    blob: index.js
    highlight: ''
    offset: 0
    _template: gistpenEmbed
  - content: >
      This is a hypothetical `widget` module, which provides a `Widget` type,
      some API methods for interacting with with widgets, and a schema for
      enforcing types. This is a coherent module with a well-defined API, and it
      enables you to create a `util.js` file if you have shared logic between
      these three files that you don't want to expose to the rest of the
      application.


      Note that for now, Webpack doesn't require the `.js` extension, and Node
      also doesn't for Commonjs modules, but the ES Module implementation in
      Node will require&#x20;


      ### Other modules must import through a barrel


      Top-Level Modules enforces this boundary between modules. In a React
      application, you might have a component to display once of these widgets
      so customers can buy it. Let's take a look at how that component might use
      the `widget` module.
    _template: richText
  - repo: content/repos/top-level-modules.md
    blob: WidgetView.jsx
    highlight: ''
    offset: 0
    _template: gistpenEmbed
  - content: >
      This is a small dumb component that takes advantage of the `widget`
      module. We always import directly from the barrel instead of through
      `widget/api.js` or another folder.


      ### Modules must be pure


      In all of the above example, the modules are pure definitions of exports;
      even the barrel. Your entrypoints will import whatever they need to
      bootstrap the application and tie everything together, and everything
      outside of those entrypoints should be pure, as much as that's possible.
      This has been mostly doable with the React applications I've built, with
      Create React App using `src/index.js` as its entrypoint or Next.js
      defining your routing in `pages`.


      ### Modules must be cohesive


      What counts as "cohesive" here up is up for interpretation, but we'll talk
      about that more in the next section. The overall idea is that


      ## Module Organization Approaches


      There are a couple possible strategies you can take to folder structures.


      ### Modules by type


      Modules grouped by type, "components, reducers, etc.". Can be namespaced
      by `@app`.


      ### Modules by domain/concern


      Modules grouped by business logic they own.


      ### Namespace of modules


      Modules of a similar type namespaced. All of the modules that contain
      components nested under `@ui`, etc.


      ### Layered namespaces


      Enforce that a namespace only depends on namespaces below them, or that a
      given namespace is layered in that way.


      ## Enforcing Top-Level Modules


      ESLint plugin
    _template: richText
excerpt: >
  When you start developing React applications, or JavaScript applications
  generally, it can be difficult to know how to organize your files. Dan
  Abramov’s sage advice, while accurate, doesn’t tell you anything about whether
  what “feels right” is going to cause problems down the road. As I’ve worked
  with ESModules, I’ve started to develop an effective \[…]
featuredMedia: null
categories:
  - reference: content/categories/uncategorized.md
_template: standard
---


