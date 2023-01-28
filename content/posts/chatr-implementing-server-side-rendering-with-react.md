---
title: 'Chatr: Implementing Server Side Rendering with React'
publishedAt: '2016-04-06T15:30:29.000Z'
updatedAt: '2017-10-01T15:07:42.000Z'
menu: content/menus/main.md
header: content/headers/main.md
status: publish
body:
  - content: >
      In our [introduction to the
      series](https://jamesdigioia.com/chatr-exploring-react-rxjs-with-a-chat-application/),
      we got a simple static page rendered with
      [`express.js`](http://expressjs.com/) and
      [`handlebars`](http://handlebarsjs.com/). Now that we've got everything
      going, we're going to leverage React's server-side rendering to move from
      just sending some static HTML to sending a rendered component's HTML. On
      the client side, we'll bootstrap React into the rendered HTML using the
      same state that produced the HTML on the server, and the application can
      just pick up where it left off.


      I was actually pretty impressed with how easy it was to get the actual
      server-side rendering working. However, the issue I had when I started was
      that I didn't actually start with ES6 and JSX transpiling on the server to
      start, but it makes a lot of sense that, if your goal is to build an
      isomorphic JavaScript application, you should use the same syntax on both
      sides of the wire. Since you're definitely going to need JSX transpiling
      on the server anyway, it's easier to go all-out with the `es2015` preset
      as well.


      I got that working in the [introduction to the
      series](https://jamesdigioia.com/chatr-exploring-react-rxjs-with-a-chat-application/),
      even though it didn't happen in that order in real life, so if you need a
      refresher, check that out. Now before we build our first React component,
      make sure you install `react` and `react-dom` via `npm`; these are the two
      main React tools we're going to use in this project.


      Just to get started with React, we'll replicate the current `Hello World!`
      setup with a simple `App` component that takes a required `headline` as
      its props.


      <Embed
      url="https://jamesdigioia.com/gistpens/server-side-rendering-with-react/app.js/"
      provider="twitter" />




      If this is your first introduction to React, you'll notice the XML-like
      JSX syntax in the `render` function. This is transpiled by `babel`'s JSX
      plugin into React calls that create the modeled DOM structure. For the
      most part, JSX works a like HTML, with JavaScript weaved into it, giving
      you a really powerful way of describing your UI state. Because it's still
      JavaScript and `class` is a reserved word, you see above one of the many
      differences with plain HTML; we have to use `className` to give the DOM
      node a `class`. If we were to render it with `headline` as "Hello World!",
      the resulting HTML would look like this:


      <Embed
      url="https://jamesdigioia.com/gistpens/server-side-rendering-with-react/rendered.html/"
      provider="twitter" />




      As for the other two props on the object: both them (`displayName` and
      `propTypes`) are primarily useful for development. One of React's greatest
      strengths is the ecosystem of development tools that have cropped up
      around it; this feature comes built-in! You get `console` messages when
      the component receives props of the wrong type.


      Ensuring that you're validating your props' values and types during
      development helps ensure nothing unexpected happens during production, so
      definitely get in the habit of defining your components' `propTypes` along
      with its `render` method as part of a standard component. The [React docs
      on "reusable
      components"](http://facebook.github.io/react/docs/reusable-components.html)
      has the full list of types and constraints you can put in your
      `propTypes`. The `displayName` is used in these log methods to indicate
      which component has the error, making it easier to debug where the problem
      is coming from.


      This is a really simple component, but now we need to pass it props and
      render it. The process for doing that on the server side mirrors the
      client side, so let's get it running on the server first.


      In our main `server.js` file, we have to change the root (`/`) route to
      render this component instead of the static string we provided earlier.
      Here's the new `server.js` code:


      <Embed
      url="https://jamesdigioia.com/gistpens/server-side-rendering-with-react/server.js/"
      provider="twitter" />




      [`react-dom`](https://www.npmjs.com/package/react-dom) is React's DOM
      rendering tools. These used to be bundled with React but they were split
      off in
      [v0.14](https://facebook.github.io/react/blog/2015/10/07/react-v0.14.html).
      They were split off from the main React package because React has
      ambitions beyond just the DOM, like
      [`react-native`](https://github.com/facebook/react-native) and others, so
      separating the packages makes sense for the project. These tools allow us
      to render the React components on the server as well as to the DOM; in
      this case, we're using it to render the React component to a string, so
      the `express` server can send it to the client.


      The first thing we do is set up the initial page `state` variable. As we
      build out the full application, this would be the point where we fetch the
      information from the database that's required to render the page state. In
      our case, we're just going to set our `headline` string.


      From there, we just call `ReactDOMServer.renderToString` on the `App`
      component, passing in the `state` variable using JSX's [spread
      attributes](https://facebook.github.io/react/docs/jsx-spread.html) to pass
      the object's properties as the component's props. This JSX syntax is
      modeled after ES6's [spread
      operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator),
      allowing you to pass in the entire state object rather than just the props
      the component needs, which can be a bit more cumbersome for larger
      components.


      Lastly, we stringify the state object so we can pass it into the view,
      where it'll get received by the client code to boostrap the same React
      component.


      On the client-side, we just need to bootstrap off the DOM node and state
      object we originally rendered with:


      <Embed
      url="https://jamesdigioia.com/gistpens/chatr-boilerplate/client-js-2/"
      provider="twitter" />




      On the client side, we call the `render` method with the component as well
      as the DOM element to render onto. React will automatically pick up the
      fact that this is React-sourced HTML and instead of rerendering the whole
      page, will just attach the event listeners to the DOM, using the rendered
      `data-reactid` attributes.


      From there, you can bootstrap your application however you'd like,
      depending upon how you choose to structure your application. In the next
      article, we're going to start wiring up the RxJS streams, building a
      stream that will model our state as a series of messages as well
      functioning as a clearinghouse for all of the messages running through the
      client application. In this way, we'll be able to direct those messages to
      and from the server and throughout the server application, with the UI
      just responding to state refreshes from this main stream.
    _template: richText
excerpt: >
  In our introduction to the series, we got a simple static page rendered with
  express.js and handlebars. Now that we’ve got everything going, we’re going to
  leverage React’s server-side rendering to move from just sending some static
  HTML to sending a rendered component’s HTML. On the client side, we’ll
  bootstrap React into the rendered HTML \[…]
featuredMedia: content/media/react-js-logo.md
categories:
  - reference: content/categories/web-development.md
_template: standard
---


