---
title: Arrow functions are not the solution you've been looking for
publishedAt: '2018-01-30T22:46:45.000Z'
updatedAt: '2018-01-30T22:46:45.000Z'
menu: content/menus/main.md
header: content/headers/main.md
status: publish
body:
  - content: >
      JavaScript's Arrow functions were supposed to solve all our `this`-related
      problems but instead just replaced those `this`-related problems with
      other `this`-related problems.


      A friend of mine posted this in our local Slack channel, and I've seen a
      variation of this problem a number of times already:


      \[gistpen id="5562"]


      Note the `<- Fails here`. Can you spot why? I'll wait...


      Figure it out...


      ...yet?


      Ok, I'll tell you. `this` inside of `listTables` is lexically-bound, so
      it's the same `this` as `foo`, *not* the returned object. So if the
      function is called in global scope, which it likely is, `this === window`,
      or even `this === undefined`, depending on whether we're in strict mode.


      We're just moving our problems around, and we're even getting to the point
      of introducing *more* syntax to solve the problem arrow functions were
      supposed to solve in the first place (see the new class fields proposal,
      which will allow you to write this:


      \[gistpen id="5571"]


      and the function stays bound to the class instance. None of this really
      solves the underlying problem, which is the repeated attempt to shoehorn
      patterns into the language that don't belong.


      JavaScript is not a traditional class-oriented language. Stop trying to
      make it one.
    _template: richText
excerpt: >
  JavaScript’s Arrow functions were supposed to solve all our this-related
  problems but instead just replaced those this-related problems with other
  this-related problems. A friend of mine posted this in our local Slack
  channel, and I’ve seen a variation of this problem a number of times already:
  Note the \<- Fails here. Can you spot why? \[…]
featuredMedia: content/media/airport-20543_960_720.md
categories:
  - reference: content/categories/web-development.md
tags:
  - reference: content/tags/arrow-functions.md
  - reference: content/tags/es2015.md
  - reference: content/tags/es6.md
  - reference: content/tags/functional-programming.md
  - reference: content/tags/javascript.md
  - reference: content/tags/object-oriented-programming.md
_template: standard
---


