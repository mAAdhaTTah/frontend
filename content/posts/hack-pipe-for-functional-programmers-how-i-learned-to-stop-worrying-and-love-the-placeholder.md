---
title: >-
  Hack Pipe for Functional Programmers: How I learned to stop worrying and love
  the placeholder
publishedAt: '2021-09-11T18:00:54.000Z'
updatedAt: '2021-09-13T12:29:39.000Z'
menu: content/menus/main.md
header: content/headers/main.md
status: publish
body:
  - content: >
      I've been involved with the development of the pipe operator (`|>`) in
      JavaScript for 4 years, going all the way back to 2017 when it was just a
      humble pipeline that did basic function application. Over the course of
      the discussion, the proposal evolved into two competing syntaxes, F# &
      Smart-Mix, exploring different ways of handling `await`, arrow functions,
      and the overall approach to composition. Throughout the process, I was
      strongly in favor of the F# variant, preferring the simplicity &
      functional nature of applying values to functions, and I argued
      strenuously for it over Smart-Mix, which I viewed as overly complicated.


      The Smart-Mix syntax has since evolved into its current Hack iteration,
      dropping the "bare style" (`x |> a.b`, without a placeholder) and
      simplifying its syntax accordingly. Around that time, the previous
      champion of the proposal, [Daniel
      Ehrenberg](https://twitter.com/littledan), stepped down and [Tab
      Atkins-Bittner](https://twitter.com/tabatkins) stepped in to take his
      place. While Daniel favored the F# pipe, Tab favored the Smart pipe
      previously and the evolved Hack pipe now and as champion, had been working
      to bring the TC39 committee (the one that specifies JavaScript) to
      consensus around the Hack pipe.


      With Tab taking on champion responsibilities now, I've been discussing the
      proposal with them and the rest of the champion group. While I originally
      came into the conversation advocating for the F# pipe, **I'm now convinced
      the Hack pipe is the superior option, and that it would be beneficial *to
      the functional community* to embrace it**. At its core, Hack pipe is a
      better bridge between mainstream & functional JavaScript and makes it
      easier for mainstream JavaScript to adopt functional patterns.


      ## The functional/mainstream split


      Right now, the functional community is cut off from the rest of the
      JavaScript ecosystem. In order to do any of the fun & exciting things
      functional programming enables, you need to use specially-designed
      functional libraries.
      [`lodash/fp`](https://github.com/lodash/lodash/tree/4.17.15-npm/fp) is one
      well-known example; [Ramda](https://ramdajs.com/) is another. While the
      immutability & side-effect-free behaviors of these libraries are extremely
      valuable to both functional programmers & the wider JavaScript community,
      they both also bring in the overhead of one of functional programming's
      more complicated concepts: currying.


      ### Traditional currying vs JavaScript currying


      Currying traditionally means functions that take a single argument at a
      time, returning a new function until it's received all of its arguments,
      at which point the function is evaluated. To emulate this directly, you'd
      have to write functions in JavaScript like this:
    _template: richText
  - repo: content/repos/functional-hack.md
    blob: add.js
    highlight: ''
    offset: 0
    _template: gistpenEmbed
  - content: >
      This is great for functional composition. It's a small, narrowly-focused
      function you can combine with other small, narrowly-focused functions to
      solve bigger problems. `add` can be partially applied to create functions
      and use it in a larger composition:
    _template: richText
  - repo: content/repos/functional-hack.md
    blob: doubleThenAdd2.js
    highlight: ''
    offset: 0
    _template: gistpenEmbed
  - content: >
      But even with that benefit, this is clearly not the normal way to write
      functions. If you call them the normal way, they just take the first
      argument and discard everything after that.
    _template: richText
  - repo: content/repos/functional-hack.md
    blob: addCallNormal.js
    highlight: ''
    offset: 0
    _template: gistpenEmbed
  - content: >
      Even functional programmers recognize that this is un-Javascipt-y, which
      is why they invented the `curry` function.
    _template: richText
  - repo: content/repos/functional-hack.md
    blob: curriedAdd.js
    highlight: ''
    offset: 0
    _template: gistpenEmbed
  - content: >
      `curry` takes in a normal function and returns a curried version that
      works in both forms. [At
      core](https://github.com/ramda/ramda/blob/68535de7f8b1bc0c7848948c3bf998d5da88b85a/source/internal/_curryN.js),
      `curry` works by looping over the arguments provided and counting them,
      building up its internal list of arguments. If the function is missing
      arguments, it returns a new function which takes the remaining arguments;
      if the number of arguments provided matches the `length` of the function,
      the underlying function is called. Care needs to be taken in this
      implementation to ensure the length of the returned function matches the
      expected remaining arguments, which is done with [this nasty-looking
      internal
      helper](https://github.com/ramda/ramda/blob/68535de7f8b1bc0c7848948c3bf998d5da88b85a/source/internal/_arity.js).


      With `curry`, functions are free to work both the normal way and the
      partially applied way, enabling functions not written for functional
      composition to be composable. `curry` is a bridge between more traditional
      approaches to functional programming, where currying is built into the
      language, and JavaScript's behavior expected behavior.


      ### `curry` is a suboptimal bridge


      While it does provide *a* bridge, it's a bridge that actually exacerbates
      the divide between functional & mainstream JavaScript. It's imperfect,
      attempting to bring functionality to JavaScript not native to the
      language; it's one-way, sucking functions into the functional world while
      giving nothing back; and it's complicated, making functional programming
      more difficult for mainstream JavaScript developers. Ultimately, this
      produces an approach to functional programming that is fundamentally
      un-JavaScript-y.


      #### `curry` is an imperfect bridge


      If you've been working in functional JavaScript, you've probably come
      across some variations on `curry`: `curry2` & `curryN`. `curryN` takes an
      additional argument, the `length` of the function, and returns a function
      that evaluates when that number of arguments have been provided (with
      `curry2` specifically dealing with functions that take 2 arguments). This
      is necessary because in JavaScript, using `length` may not mean what you
      want.


      The first example is how default parameters are handled in JavaScript. In
      the below example, `sort` has a `length` of 1, not 2.
    _template: richText
  - repo: content/repos/functional-hack.md
    blob: sort.js
    highlight: ''
    offset: 0
    _template: gistpenEmbed
  - content: >
      The default parameter doesn't count towards the length of the function, so
      if you want this function to take two arguments before being called, you
      need to tell it explicitly because JavaScript considers this a function
      with one argument.


      Another pattern this doesn't work well with is options-bag parameters. The
      below example isn't curry-able at all without some significant
      hoop-jumping:
    _template: richText
  - repo: content/repos/functional-hack.md
    blob: api.js
    highlight: ''
    offset: 0
    _template: gistpenEmbed
  - content: >
      In order to turn these into composable functions, you have to wrap them in
      functions that take these options one at a time, which can be awkward at
      best. This gets worse if the second argument is the options-bag argument,
      with a handful of default arguments applied. None of this is `curry`-able
      in the traditional sense, and for the most part, is solved by wrapping
      `api` in an arrow function to make it do what you want. `curry` just isn't
      helpful to make this composable.


      #### `curry` is a one-way bridge


      While `curry` functions as a bridge between the non-functional world and
      the functional world, it's really a one-way bridge. Functions that aren't
      as easily composable need to be made composable in order to interface with
      the wider functional ecosystem, but there is no reciprocity.


      Taking the above `sort` function as an example, that's written in an
      mainstream idiomatic fashion, with the data coming first & the optional,
      defaulted argument coming second, but to make this composable, you need to
      make the first argument the algorithm:
    _template: richText
  - repo: content/repos/functional-hack.md
    blob: sortCurried.js
    highlight: ''
    offset: 0
    _template: gistpenEmbed
  - content: >
      This is weird! The default is now required, and the data comes second,
      which is often unexpected. In this case, you could feasibly create a
      separate function for each algorithm (this is a pretty contrived example,
      for sure), but for other functions with default values, that might not
      make sense. You really want to just leave this value out, but making it
      curried makes writing a mainstream function more difficult. In this case,
      the default argument is just a string, but what if it's an options-bag?
      This gets even stranger and more complex.


      All of this means you have to write functions specifically for curried
      functional composition, and those functions are often unidiomatic for
      mainstream JavaScript. The `curry` bridge only brings functions *into*
      functional JavaScript style; it doesn't send functions *back* into
      mainstream style, and writing mainstream JavaScript often makes it
      difficult to adopt functional patterns because of this mismatch.


      #### `curry` is a complicated bridge


      In my experience, while these curried functions & compositions can make
      for really elegant code once written, debugging them when they go wrong
      can be... challenging. You lose visibility onto where arguments are
      actually coming from, pipelines can be difficult to step through in a
      debugger, and the overall behavior of the system can become opaque without
      a strong sense of what each underlying function does (do *you* know what
      [`converge`](https://ramdajs.com/docs/#converge) does without looking it
      up? Do most JavaScript programmers?).


      All of this makes functional programming in JavaScript hard for beginners.
      Even the basic `add` function, while appearing simple, can take a second
      for new programmers to realize it's a function *that returns a function*.
      Functional composition is an incredibly powerful way of thinking through
      problems, and functional idioms make bringing that to non-functional
      programmers more difficult by requiring an understanding of several
      concepts before they can take advantage of it. There are tools like
      [`ramda-debug`](https://github.com/sebinsua/ramda-debug) that make
      debugging these pipelines easier, but exacerbates the issue of needing to
      opt into a whole new ecosystem in order to use these tools and deepens the
      divide between functional & mainstream JavaScript.


      #### Curried (& point-free) code is un-JavaScript-y


      I'm not the first person to [point this
      out](https://2ality.com/2017/11/currying-in-js.html). Composing functions
      in the way described is used widely in functional JavaScript, and (in my
      experience) rarely outside of it. Every time a beginner runs into code
      that looks like this:
    _template: richText
  - repo: content/repos/functional-hack.md
    blob: doubleThenAdd2.js
    highlight: ''
    offset: 0
    _template: gistpenEmbed
  - content: >
      there's like 4+ concepts to learn in order to understand what's going on
      here, plus new tools & techniques to verify & debug these compositions.
      Developers find it ["difficult to grasp and hard to
      read"](https://hughfdjackson.com/javascript/does-curry-help/), and it
      takes some time & experience with the style for a function like the above
      to become intuitive.


      Early in my career, I used Ramda extensively and tried to introduce it &
      its associated concepts to my team. Despite several of them being senior
      engineers, this took a lot of work to explain and it never became a
      natural approach for them. I also struggled with debugging my own
      pipelines in the process and have since abandoned Ramda and its associated
      technqiues as my utility library of choice.


      The overhead of these concepts makes adopting other functional concepts in
      the wider JavaScript community more difficult because they don't integrate
      well into non-functional code without adopting an overall functional
      style. Both mainstream JavaScript and functional JavaScript in particular
      suffer as a result, as mainstream JavaScript fails to benefit from
      functional ideas while functional programming is relegated to playing with
      its own toys instead of sharing everyone else's.


      ## Reject currying; embrace composition


      Bringing a native pipe operator into JavaScript, on its own, will address
      a lot of these issues. There will no longer be a need for a `pipe` or
      `compose` function, and the behavior of the pipe is more intuitive than
      either of those functions could ever be. It literally looks like an arrow!
      `x |> func`*looks* like "`x` going into `func`"! Right off the bat, we
      make composition more accessible to programmers new to functional
      programming.


      Additionally, it makes debugging easier. With a pipe integrated into
      JavaScript, the devtools can more easily add breakpoints in between
      pipeline steps, inspecting the output of any given step without additional
      tooling required. This is similar to how you can add a breakpoint to a
      one-line arrow function right after the arrow, inspecting the callstack &
      arguments inline. These two features alone make the value of the pipe
      worth it for the language.


      By and large, between the two proposals, most functional programmers
      prefer the F# proposal. Looking at `doubleThenAdd2` with F# pipe, we see
      effectively a straight translation of the current usage:
    _template: richText
  - repo: content/repos/functional-hack.md
    blob: doubleThenAdd2F#.js
    highlight: ''
    offset: 0
    _template: gistpenEmbed
  - content: >
      Functional programmers have a pretty straightforward translation from
      their current `pipe` to `|`> because to works like what they're already
      used to doing in functional JavaScript. Currying & point-free programming
      is such a significant part of how functional programmers in JavaScript
      code that they want a pipe operator that allows them to continue doing
      that.


      But... what if it wasn't? The Hack pipe version looks like this:
    _template: richText
  - repo: content/repos/functional-hack.md
    blob: doubleThenAdd2Hack.js
    highlight: ''
    offset: 0
    _template: gistpenEmbed
  - content: >
      Now, we no longer even *need* currying; we can use our base, uncurried
      `add` function without modification. Because Hack allows arbitrary
      expressions, rather than functions, this can actually be even simpler:
    _template: richText
  - repo: content/repos/functional-hack.md
    blob: doubleThenAdd2HackNoFunc.js
    highlight: ''
    offset: 0
    _template: gistpenEmbed
  - content: >
      We don't even need functional versions of these operators! We can compose
      *operators*, not just functions, without needing to introduce or write a
      whole library for them.


      The entire world of non-curried libraries get opened up to functional
      composition. We no longer need `lodash/fp` as a curried alternative to the
      base `lodash` functions because the base `lodash` functions work *just
      fine* in the pipe. The Web platform as a whole is now available to
      functional programmers directly. `fetch` doesn't need a special wrapper to
      handle its options bag; you don't need to dive into `date-fns/fp` when
      [`Temporal`](https://tc39.es/proposal-temporal/docs/) can compose; the
      entire DOM can be manipulated in a pipeline just like everything else,
      without wrapping every step in an arrow function! Even future proposals,
      like [Records & Tuples](https://github.com/tc39/proposal-record-tuple),
      could possibly be getting *syntax* for [deep path property
      setting](https://github.com/tc39/proposal-record-tuple), which works
      better with Hack's expression-based operator.


      What's more, this operator is *much* easier to understand than `curry`.
      Beginning programmers understand expressions; they may not call them that,
      but they know how `x + 1` and `await fetch()` work & behave. With Hack
      pipe, there are a bunch of concepts that are no longer necessary to learn
      in order to start taking advantage of composition.


      Functional programmers can stop explaining currying & point-free
      programming and focus on bring other functional features into the code
      people write every day. Mainstream JavaScript can start to use constructs
      like `Maybe` & `Either`, both of which I've found to be quite useful and
      introduce regularly in non-functional JavaScript, especially for wrapping
      promises. Being able to buy into these concepts without the overhead of
      currying & point-free programming would be a great benefit to the wider
      JavaScript community and much easier for beginner programmers to
      understand & use on their own.


      The Hack pipe is thus **good for functional programming**: it bridges the
      divide between the functional programming community & the wider JavaScript
      community. A whole category of interop tooling goes away in favor of a
      native operator that both mainstream & functional JavaScript can take
      advantage of.


      ## The future of functional programming is Hack pipe


      With the most recent TC39 meeting, the Hack pipe advanced to Stage 2. I
      expect this news, especially given my long-standing preference for F#, to
      cause some consternation amongst the F# adherents and their functional
      preferences. However, **Hack is a win for functional programming in
      JavaScript, even if it means giving up some time-honored functional
      traditions.**


      It will definitely take some time for the ecosystem to adapt to the
      introduction of Hack pipe, although curried functions can take advantage
      of the pipe operator as-is.
    _template: richText
  - repo: content/repos/functional-hack.md
    blob: curriedWithHack.js
    highlight: ''
    offset: 0
    _template: gistpenEmbed
  - content: >
      Some algebraic data types that work well with the Hack pipe operator,
      support tree-shaking, & are comprehensible to beginners would go a long
      way towards making functional programming more idiomatic in non-functional
      contexts, decoupling them from more complicated functional approaches to
      solving problems.


      Functional programming in JavaScript has long adopted techniques and tools
      from other functional languages; this is why currying & point-free
      programming have become so popular in functional JavaScript. But
      JavaScript isn't Haskell, and currying isn't built-in to JavaScript, so
      its adoption will always be a bit unnatural by comparison. We should adopt
      a pipe operator that feels native to JavaScript, and adapt our techniques
      for more natural functional JavaScript for the masses.
    _template: richText
excerpt: >
  I’ve been involved with the development of the pipe operator (|>) in
  JavaScript for 4 years, going all the way back to 2017 when it was just a
  humble pipeline that did basic function application. Over the course of the
  discussion, the proposal evolved into two competing syntaxes, F# & Smart-Mix,
  exploring different ways of \[…]
featuredMedia: null
categories:
  - reference: content/categories/web-development.md
_template: standard
---


