---
title: Code Evolution in 3 Styles
publishedAt: '2022-05-09T22:40:19.000Z'
updatedAt: '2022-05-09T22:40:19.000Z'
menu: content/menus/main.md
header: content/headers/main.md
status: draft
body:
  - content: >
      The other day, I was working on some code to request & save an
      authorization token. The token was saved in the module scope, with a
      function responsible for refetching the token if it's not available. I
      went through 3 iterations of the code, each with a slightly different
      style, which I'd like to talk a bit about, why I attempted them, and the
      benefits & drawbacks of them. Let's take a look!


      ## Early-Return Style


      The very first snippet I wrote looked like this:


      ```javascript

      ```


      This tends to be how I start off solving a lot of problems: eliminate the
      cases where I don't have to do anything, then proceed to the logic of the
      function. In this case, the `token != null` logic eliminates the case
      where we already have a non-nullish token, which we can just return
      immediately.


      The major benefit of this is when you have a lot of potential conditions.
      Instead of a bunch of nested `if` statements, you can unwrap them, return
      what you need immediately, then proceed into the body of the function.
      Lots of nested `if` statements can make code hard to read, and
      deeply-indented code can require a lot of mental context to understand
      what's happening.


      The downside is it can make the function longer, which has its own
      readability downsides. In this case, it's not a huge deal, because there's
      just the one, but I'm also eliminating the braces on the `if` statement
      and doing that weird assign-and-return because I want keep the length of
      the function down.


      ## Code Golf Style


      After looking at this code for a second, I realized I could trim this code
      down quite a bit if I wanted to:


      ```javascript

      ```


      I definitely take some perverse joy in compressing code like this, and
      turning 3 lines of code into one, even eliminating the `return` at the
      end, is really nice. If I was able to take advantage of logic assignment,
      I could shorten it further:


      ```javascript

      ```


      Generally speaking, the fewer lines of code you have, the few lines are
      available for bugs to reside in. Taken to its logical extreme, this may be
      the "best" version of the code. But let's be honest: this approaches
      ASCII-soup. There is so much happening around the `?`s in this snippet
      that it's hard to argue that this is really readable for most people. Even
      worse, because it's taking advantage of several new features, it can be
      hard for people to look this up and understand what's happening without
      the prior understanding of `??=` & `??` & `?.`, and if you don't
      understand those, it's impossible to wrap your head around this at all.


      I couldn't inflict this on my coworkers, but it did make me realize
      something I should have in the first snippet: the result of this function
      is returning the token. So we should just do that!


      ## One Return Style


      I ended up shipping this version:


      ```javascript

      ```


      This version, while the longest of the 3 versions, felt the most
      idiomatic. It has a single return at the end, the `token`, which makes
      sense given the function is literally `getToken`. I'm forced to add the
      braces to the `if` statement, now that it's multiple lines, but in return,
      I get to trim down to a single `return` statement.


      Once I got to this point, I realized another thing I probably should have
      up front: this is just a singleton pattern. While I don't write OOP as
      much as I used to, there was a time when lazy initialization was super
      common ([I used to write WordPress plugins, after
      all](https://jamesdigioia.com/a-better-wordpress-singleton/)). This is
      just a version of that for JavaScript except instead of static class
      properties, it's a variable in the module scope.
    _template: richText
excerpt: >
  The other day, I was working on some code to request & save an authorization
  token. The token was saved in the module scope, with a function responsible
  for refetching the token if it’s not available. I went through 3 iterations of
  the code, each with a slightly different style, which I’d like to talk \[…]
featuredMedia: null
categories:
  - reference: content/categories/uncategorized.md
_template: standard
---


