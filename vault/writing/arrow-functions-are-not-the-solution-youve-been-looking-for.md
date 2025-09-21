---
tags:
  - inbox
  - web
  - essay
title: Arrow functions are not the solution you've been looking for
description: "JavaScript’s Arrow functions were supposed to solve all our this-related problems but instead just replaced those this-related problems with other this-related problems. A friend of mine posted this in our local Slack channel, and I’ve seen a variation of this problem a number of times already: Note the \\<- Fails here. Can you spot why? \\[…]"
slug: writing/arrow-functions-are-not-the-solution-youve-been-looking-for
published_at: 2018-01-30T22:46:45.000Z
updated_at: 2018-01-30T22:46:45.000Z
excerpt: "JavaScript’s Arrow functions were supposed to solve all our this-related problems but instead just replaced those this-related problems with other this-related problems. A friend of mine posted this in our local Slack channel, and I’ve seen a variation of this problem a number of times already: Note the \\<- Fails here. Can you spot why? \\[…]"
featuredMedia: "[[airport function (not really a function)]]"
share: true
---

JavaScript's Arrow functions were supposed to solve all our `this`-related problems but instead just replaced those `this`-related problems with other `this`-related problems.

A friend of mine posted this in our local Slack channel, and I've seen a variation of this problem a number of times already:

<InternalEmbed title="gistpens/arrow-function-problems" url="/vault/gistpens/arrow-function-problems.md">
```js title="arrow-error.js"
function foo(ddb) {
  return {
    listTables: (params = {}, cb = idFunc) => {
      const self = this;
      let currentList = params.currentList || [];

      return toPromise(
        ddb,
        ddb.listTables,
        omit(params, "currentList"),
        cb,
      ).then((r) => {
        console.log("LISTTABLES result", r);
        currentList = currentList.concat(r.TableNames || []);

        if (!r.LastEvaluatedTableName || r.TableNames.length === 0) {
          return { ...r, TableNames: currentList };
        }

        return self.listTables(
          {
            // <- Fails here
            ...params,
            currentList,
            ExclusiveStartTableName: r.LastEvaluatedTableName,
          },
          cb,
        );
      });
    },
  };
}
```
</InternalEmbed>

Note the `<- Fails here`. Can you spot why? I'll wait...

Figure it out...

...yet?

Ok, I'll tell you. `this` inside of `listTables` is lexically-bound, so it's the same `this` as `foo`, _not_ the returned object. So if the function is called in global scope, which it likely is, `this === window`, or even `this === undefined`, depending on whether we're in strict mode.

We're just moving our problems around, and we're even getting to the point of introducing _more_ syntax to solve the problem arrow functions were supposed to solve in the first place (see the new class fields proposal, which will allow you to write this:

<InternalEmbed title="gistpens/arrow-function-problems" url="/vault/gistpens/arrow-function-problems.md">
```js title="class-methods.js"
class MyClass {
  myMethod = () => {
    // ...code
  };
}
```
</InternalEmbed>

and the function stays bound to the class instance. None of this really solves the underlying problem, which is the repeated attempt to shoehorn patterns into the language that don't belong.

JavaScript is not a traditional class-oriented language. Stop trying to make it one.
