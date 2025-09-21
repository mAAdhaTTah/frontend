---
tags:
  - web
  - essay
title: Fat Arrow Functions, One-Line Callbacks, and Composing Promises
description: "I’m not really a fan of fat arrow functions in ES2015 for the same reason I don’t like the introduction of class: JavaScript is a prototypal language, so attempting to cram class-based inheritance is squeezing a round peg into a square hole. The prototype chain and closure scoping make for a number of interesting patterns \\[…]"
slug: writing/fat-arrow-functions-one-line-callbacks-and-composing-promises
published_at: 2015-12-09T18:04:58.000Z
updated_at: 2015-12-09T18:16:56.000Z
excerpt: "I’m not really a fan of fat arrow functions in ES2015 for the same reason I don’t like the introduction of class: JavaScript is a prototypal language, so attempting to cram class-based inheritance is squeezing a round peg into a square hole. The prototype chain and closure scoping make for a number of interesting patterns \\[…]"
featuredMedia: "[[Fat Arrow Functions]]"
share: true
---

I'm not really a fan of [fat arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) in ES2015 for the same reason I don't like the introduction of `class`: JavaScript is a prototypal language, so attempting to cram class-based inheritance is squeezing a round peg into a square hole. The prototype chain and closure scoping make for a number of interesting patterns for solving problems and structuring your code, and I'd rather see more exploration about what power that gives us . [Eric Elliott](https://vimeo.com/69255635) has written a number of [really interesting articles](https://medium.com/javascript-scene/common-misconceptions-about-inheritance-in-javascript-d5d9bab29b0a) about object composition that have been really thought provoking.

Fat arrow functions are primarily used to bind a function's `this` to its lexical scope. That's not _[all](https://github.com/getify/You-Dont-Know-JS/issues/513)_ it does; they also bind their `arguments` and `super` as well. There's a [great explanation](http://blog.getify.com/arrow-this/) about how they fully work, but their common purpose is to bind `this` to the scope of the arrow function. That's not what we need; we need to use scoping more effectively so binding `this` isn't necessary and play into the strengths of the language.

I am, however, a huge fan of Promises, and I've been working on a project recently that makes heavy use of them, and not only do they make handling asynchronous code a breeze, it's much easier to build concurrency into the application as well. With the Bluebird library, composing Promise chains and setting up dependencies for a set of asynchronous actions is _fun_. It is during the composition of these chains that fat arrow functions make for some really elegant syntax.

When you're composing together a chain of Promises to retrieve a particular value, you'll often find yourself doing these one-off transformations:

<InternalEmbed title="gistpens/fat-arrow-functions-one-line-callbacks-and-composing-promises" url="/vault/gistpens/fat-arrow-functions-one-line-callbacks-and-composing-promises.md">
```js title="old-style.js"
doSomething().then(function (value) {
  return value.prop;
});
```
</InternalEmbed>

This is a really simple example, but something that comes up all the time when composing Promise chains: You need to take the value from a previous function and do some small manipulation to it to get the value you're looking for.

With fat-arrow functions, the above 3 lines become a single line:

<InternalEmbed title="gistpens/fat-arrow-functions-one-line-callbacks-and-composing-promises" url="/vault/gistpens/fat-arrow-functions-one-line-callbacks-and-composing-promises.md">
```js title="new-style.js"
doSomething().then((value) => value.prop);
```
</InternalEmbed>

Fat arrow functions, when written as a one-liner, automatically returns the value, so any function that works as simply as this does are vastly improved by writing them this way. This comes up all the time, especially when using libraries that depend on Promise chains. You'll often find yourself calling asynchronous methods on asynchronously returned objects, so chaining together a set of Promise methods become really clean:

<InternalEmbed title="gistpens/fat-arrow-functions-one-line-callbacks-and-composing-promises" url="/vault/gistpens/fat-arrow-functions-one-line-callbacks-and-composing-promises.md">
```js title="composing-promises.js"
doSomething()
  .then((value) => value.asyncMethod())
  .then((asyncMethodValue) => asyncMethodValue.prop);
```
</InternalEmbed>

If you have 3 or 4 of these steps, you can see how writing these becomes an absolute joy.

The other thing writing fat arrow functions do is, when written on one line like this, they **always return a value.** One of the most annoying bugs to solve is a Promise chain is falling down because you forgot to return a value or a Promise somewhere. Because one-line fat arrow function always return a value, they protect you from making this mistake and save you from a lot of time debugging stupid problems.

Most of my callbacks are being written in this pattern, and it's been really lovely. Fat arrow functions look a little weird compared to what we're used to, but they have some nice use cases.
