---
title: 'Chatr: Exploring React & RxJS with a Chat Application'
publishedAt: '2016-03-29T17:37:22.000Z'
updatedAt: '2016-04-04T00:27:22.000Z'
menu: content/menus/main.md
header: content/headers/main.md
status: publish
body:
  - content: >
      [React.js](https://facebook.github.io/react/) has pretty well skyrocketed
      through the JavaScript community since its initial announcement, and with
      its reactive approach to UI, there's been a growing interest in functional
      programming in the JavaScript community as a result. Because JavaScript
      allows you to pass functions around like objects, it makes it very easy to
      apply functional concepts to the language. Like much of the community,
      I've also been
      [reading](https://medium.com/@chetcorcos/functional-programming-for-javascript-people-1915d8775504#.2bmh3geet)
      [quite](http://fr.umio.us/favoring-curry/) [a
      bit](http://fr.umio.us/why-ramda/) about [functional
      programming](https://github.com/timoxley/functional-javascript-workshop),
      but I haven't had the opportunity to build a full-fledged application on
      these ideas.


      I've played around with
      [RxJS](https://github.com/Reactive-Extensions/RxJS) &
      React<FootnoteReference id="1" /> a little bit, but I'm not entirely sure
      what a full-stack architecture might look like (yet). I want to explore
      the possibilities by building a real-time chat application (with the
      uninspiring name Chatr) on Node.js with RxJS, React, &
      [Ramda](http://ramdajs.com/0.19.1/index.html), applying functional
      programming to a system that can easily be modeled as a stream of
      messages/events.


      With RxJS, I should be able pipe messages around the application,
      including into React to update the UI on the client side, as well as to
      and from a data store like [Redis](http://redis.io/) or a messaging queue
      like [RabbbitMQ](https://www.rabbitmq.com/) on the server side, with the
      data streaming between the server & client over a Socket.io stream. This
      architecture could also be inspired by
      [Flux](https://facebook.github.io/flux/), ensuring all data flows into a
      central "store stream," which then pipes out the messages to wherever it
      needs to go. This primary data store stream probably could be reused on
      both the client & server side, which allows us to introduce some
      isomorphism in both our data handling & UI.


      My plan is to build this in public and write about it, and see what some
      of the advantages and drawbacks of this approach for building web
      applications. You can follow along with [the repo on
      GitHub](https://github.com/mAAdhaTTah/chatr), or keep up with the [thread
      on this website](https://jamesdigioia.com/thread/rxjs-react-w-chatr/).


      Before we can get started doing anything interesting, we've got to get
      some boilerplate going. Since we want to try out some isomorphic
      techniques, we're going to need to, at a minimum, get the JSX compiled on
      the server side. [`babel`](https://babeljs.io/) is the default standard
      for compiling JSX, and they have a very clear
      [example](https://github.com/babel/example-node-server) for getting it
      running on the server. Since we're already using it, we're also going to
      bring in ES6 compilation and use that for both the server- and client-side
      code.


      Following along with the example, we're going to add `nodemon`,
      `babel-cli`, and the two babel presets we're going to use,
      `babel-preset-es2015` and `babel-preset-react`. Since we're going to be
      sharing the `babel` configuration between the server and client, we need a
      `.babelrc` file, which `babel` uses to register presets and plugins:


      <Embed
      url="https://jamesdigioia.com/gistpens/chatr-boilerplate/babelrc-2/"
      provider="twitter" />




      Finally, add `nodemon server.js --exec babel-node` to the `package.json`'s
      scripts key as `"start"`, so we can run `npm start` to run the server.
      `babel-node` is shipped with the `babel-cli` package we installed, and it
      ensures our server-side code is compiled on-the-fly by `babel` and then
      run in `node`, with `nodemon` recompiling and restarting the server
      whenever our code changes.


      We're going to use [express.js](http://expressjs.com/) to handle routing
      and serve our static assets. Let's create the `server.js` file and get
      some simple routes going:


      <Embed
      url="https://jamesdigioia.com/gistpens/chatr-boilerplate/server-js-2/"
      provider="twitter" />




      Pretty basic express server; run `npm start` in your terminal and then go
      to [localhost:3000](http://localhost:3000/). You should see a big "Hello
      World!". Got it? Good! Let's get some script and style compilation going.


      We'll start with the scripts. [`webpack`](https://webpack.github.io/) and
      [`browserify`](http://browserify.org/) are both solid options for
      compiling scripts using `babel`. I've used `browserify` a lot more than
      I've used `webpack`, so I'm going to use `webpack` for this project.
      Fortunately, the configuration isn't that complicated for a simple setup
      like this:


      <Embed
      url="https://jamesdigioia.com/gistpens/chatr-boilerplate/webpack-config-js-2/"
      provider="twitter" />




      We're not going to worry about getting any of the really complicated
      features setup, like hot reloading or dev servers or anything like that.
      Instead, we're going start with to create a simple script that uses some
      ES6 to ensure that we're compiling our scripts correctly.


      <Embed
      url="https://jamesdigioia.com/gistpens/chatr-boilerplate/client-js-2/"
      provider="twitter" />




      If you've `npm install`ed `webpack`, you can just run `webpack` in your
      terminal and it should spit out a `main.min.js` file in your `public`
      folder. Pull that up in your [browser](http://localhost:3000/main.min.js)
      and you should see the compiled file.


      On the style side, we can compile our `styles.scss` file with `node-sass`.
      I'm going to be including [Bourbon](http://bourbon.io/),
      [Neat](http://neat.bourbon.io/), and [Bitters](http://bitters.bourbon.io/)
      for this project, as I like their mixin-only approach for its flexibility
      and control. Here's the very basic `styles.scss` file:


      <Embed
      url="https://jamesdigioia.com/gistpens/chatr-boilerplate/styles-scss-2/"
      provider="twitter" />




      I'd love to get this setup with [Eyeglass](http://eyeglass.rocks/) as
      well, but we'll start with this. Install `node-sass` and run `node-sass
      styles.scss public/styles.css`. We [should
      see](http://localhost:3000/styles.css) the CSS file rendered, compressed
      and compiled correctly, with a long sourcemap appended at the end.


      Finally, we're going to convert the root route to render a template for us
      instead of using a simple string. In this case, we're going to register
      [Handlebars](http://handlebarsjs.com/) using
      [`express-handlebars`](https://github.com/ericf/express-handlebars):


      <Embed
      url="https://jamesdigioia.com/gistpens/chatr-boilerplate/handlebars-2/"
      provider="twitter" />




      which we're going to use to render a very simple template:


      <Embed
      url="https://jamesdigioia.com/gistpens/chatr-boilerplate/main-hbs-2/"
      provider="twitter" />




      This is set up this way in preparation for implementing is server-side
      rendering! The `app` variable in the template context will become the
      rendered HTML string from React, and the `state` variable will be the
      state object that produced the given HTML. Then on the client side, we'll
      pull in current state, render the React components on the current state on
      the page, and bootstrap the application. This is how the [Redux
      docs](https://github.com/reactjs/redux/blob/master/docs/recipes/ServerRendering.md)
      suggest doing it, and since they know what they're doing, we're going to
      follow their lead.


      But we're going to wire that up in the next tutorial. For now, you should
      have a simple page page, rendering "Hello World!", with a CSS file and a
      script that outputs `3` to the console. Next, we're going to write our
      first React component, render it on the server, and bootstrap our
      application.


      <FootnoteDefinition id="1">
        In the next version of WP-Gistpen, the settings page is built with React & RxJS.
      </FootnoteDefinition>
    _template: richText
excerpt: >
  React.js has pretty well skyrocketed through the JavaScript community since
  its initial announcement, and with its reactive approach to UI, there’s been a
  growing interest in functional programming in the JavaScript community as a
  result. Because JavaScript allows you to pass functions around like objects,
  it makes it very easy to apply functional concepts to \[…]
featuredMedia: content/media/observe-all-the-things-with-rxjs.md
categories:
  - reference: content/categories/web-development.md
_template: standard
---


