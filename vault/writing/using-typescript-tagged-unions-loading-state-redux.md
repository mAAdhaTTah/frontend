---
tags:
  - web
  - essay
title: Using TypeScript tagged unions for loading state in Redux
description: Dealing with loading state is a core requirement of most apps you build. Every app needs data, that data almost always needs to be loaded from somewhere, so you need to manage your loading state. Redux doesn’t provide any particular structure for this, but combining it with TypeScript enables some useful patterns. Let’s take a \[…]
slug: writing/using-typescript-tagged-unions-loading-state-redux
published_at: 2019-07-01T18:40:36.000Z
updated_at: 2019-07-14T22:07:42.000Z
excerpt: Dealing with loading state is a core requirement of most apps you build. Every app needs data, that data almost always needs to be loaded from somewhere, so you need to manage your loading state. Redux doesn’t provide any particular structure for this, but combining it with TypeScript enables some useful patterns. Let’s take a \[…]
featuredMedia: "[union-types-traffic-lights](/vault/_data/union-types-traffic-lights.md)"
share: true
---

Dealing with loading state is a core requirement of most apps you build. Every app needs data, that data almost always needs to be loaded from somewhere, so you need to manage your loading state. Redux doesn't provide any particular structure for this, but combining it with TypeScript enables some useful patterns. Let's take a look at a few ways of handling it, some downsides to those approaches, and conclude with an approach I've used successfully on a few projects.

We'll be using TypeScript throughout the examples, but much of the concepts here are useful without the types. The TypeScript-specific content comes towards the end, so I would encourage JavaScript-only developers to read through to the end. Even if you don't use TS, the concepts applied with it can be applied with JS as well.

## Naive Approach

The most common structure you'll see for this looks like this:

<InternalEmbed title="gistpens/tagged-unions-loading-state" url="/vault/gistpens/tagged-unions-loading-state.md">
```typescript title="array-state.ts"
type State = {
  items: Item[];
};

const initialState: State = {
  items: [],
};
```
</InternalEmbed>

This seems pretty simple; start with an empty array, add additional items to the `items` keys when you fetch them, and you simplify the checks in your views. But we've already got a problem: there's no distinction between "haven't loaded any items" and "successfully loaded no items". This _can_ work for some apps, if they're really simple or they die on load failure (like a CLI app), but for most of your typical web apps, this is going to be a problem.

So let's toss in a `null` instead to indicate that the items haven't been loaded yet:

<InternalEmbed title="gistpens/tagged-unions-loading-state" url="/vault/gistpens/tagged-unions-loading-state.md">
```typescript title="array-state-null.ts"
type State = {
  items: Item[] | null;
};

const initialState: State = {
  items: null,
};

const loadedState: State = {
  items: response.data,
};
```
</InternalEmbed>

So now we can tell the difference between whether things are loaded or not: if `state.items === null`, they've been loaded. So far so good.

But what happens if the server errors? We can't represent an error state with this setup. How do we do that?

## Handling error & loading states

We could solve this by adding an error key to the state:

<InternalEmbed title="gistpens/tagged-unions-loading-state" url="/vault/gistpens/tagged-unions-loading-state.md">
```typescript title="array-error-state.ts"
type State = {
  items: Item[] | null;
  error: Error | null;
};

const initialState: State = {
  items: null,
  error: null,
};

const successState: State = {
  items: response.data,
  error: null,
};

const errorState: State = {
  items: null,
  error: response.error,
};
```
</InternalEmbed>

This allows us to represent the initial, loaded & error states, with the examples above expressing those possibilities. It is a bit onerous to derive those states though. You have to check both of the values in order to figure out where you're at, because at the "unloaded" step, both are `null`. A conditional check could look like this:

<InternalEmbed title="gistpens/tagged-unions-loading-state" url="/vault/gistpens/tagged-unions-loading-state.md">
```typescript title="array-error-conditional.ts"
if (state.items === null && state.error === null) {
  return <UnloadedView />;
}

if (state.items !== null) {
  return <LoadedView items={state.items} />;
}

// We can assume we're in the error state now
return <ErrorView error={state.error} />;
```
</InternalEmbed>

There are various ways of structuring this conditional, and all of them are variously ugly in their own particular way. You could extract these conditionals to functions, which would at least give them readable names.

However, this ssate can't tell us whether the API request has started or not. If this is a case where the API request starts immediately, then the difference is immaterial to the view. But if you need this information, you could add _another_ property to indicate whether the request is loading or not:

<InternalEmbed title="gistpens/tagged-unions-loading-state" url="/vault/gistpens/tagged-unions-loading-state.md">
```typescript title="array-error-loading.ts"
type State = {
  loading: boolean;
  items: Item[] | null;
  error: Error | null;
};

const defaultState: State = {
  loading: false,
  items: null,
  error: null,
};
```
</InternalEmbed>

And the conditional complicates accordingly:

<InternalEmbed title="gistpens/tagged-unions-loading-state" url="/vault/gistpens/tagged-unions-loading-state.md">
```typescript title="array-error-loading-conditional.ts"
if (state.loading) {
  return <LoadingView />;
}

if (state.items === null && state.error === null) {
  return <UnloadedView />;
}

if (state.items !== null) {
  return <LoadedView items={state.items} />;
}

return <ErrorView error={state.error} />;
```
</InternalEmbed>

## Unionize!

But let's take a step back: we're really trying to represent various states of the API request by checking the effects of the requests. Instead, we should just represent the current loading state explicitly:

<InternalEmbed title="gistpens/tagged-unions-loading-state" url="/vault/gistpens/tagged-unions-loading-state.md">
```typescript title="status-state.ts"
type State = {
  status: "unloaded" | "loading" | "loaded" | "error";
  items: Item[] | null;
  error: Error | null;
};

const defaultState: State = {
  status: "unloaded",
  items: null,
  error: null,
};
```
</InternalEmbed>

Now, we have all of our states represented by string, indicating exactly what state the API is in. The conditional itself gets simplified as well: we can now use a `switch` statement to exhaust all possible states:

<InternalEmbed title="gistpens/tagged-unions-loading-state" url="/vault/gistpens/tagged-unions-loading-state.md">
```typescript title="status-conditional.ts"
switch (state.status) {
  case "unloaded":
    return <UnloadedView />;
  case "loading":
    return <LoadingView />;
  case "loaded":
    return <LoadedView items={state.items} />;
  case "error":
    return <ErrorView error={state.error} />;
}
```
</InternalEmbed>

Now we're talking! There's a very clear mapping between the various states and their related views, and you know that if you're in an error state or a loaded state, what data is available to you: error state always has an error object, loaded state always has the array of items, and the loaded view itself could display a "no items found" if the array is empty.

This approach is easily extensible as well. You can add `'reloading'` and `'reload-error'` states, in case you need to refresh data while displaying the stale data at the same time. It's much more powerful and flexible than adding random keys and hoping you can continue to figure out what's happening based on the data you have.

In JavaScript, there isn't much more to be done. Since you don't have to write up the types in any meaningful way, you know that when `status === 'loaded'`, `state.items` is the array of items, and you could move on. But if you're using TypeScript, you'll need to represent that relationship in the type system. In fact, the above example will error in TypeScript, as `state.items` could be `null`. We can solve this with tagged unions.

### Tagged unions

Let's start by looking at tagged unions. A tagged union allows us to combine two types and discriminate between them with a tagged property.

<InternalEmbed title="gistpens/tagged-unions-loading-state" url="/vault/gistpens/tagged-unions-loading-state.md">
```typescript title="tagged-union.ts"
type First = {
  tag: "first";
  prop: number;
};

type Second = {
  tag: "second";
  value: string;
};

type FirstOrSecond = First | Second;

declare function getFirstOrSecond(): FirstOrSecond;

const thing: FirstOrSecond = getFirstOrSecond();

switch (thing.tag) {
  case "first":
    // TypeScript knows prop exists and is a number.
    // Accessing thing.value would cause an error.
    return thing.prop + 1;
  case "second":
    // And value exists and is a string here
    return thing.value + " came in second";
}
```
</InternalEmbed>

We've created a union type, `FirstOrSecond`, from two types with an overlapping property, `tag`. The types can have any additional properties they'd like, as long as there's one overlapping property, with a constant of some kind, that TypeScript can use to discriminate between the types. Actions in Redux, with their `type` property, are another common example of this, and [typesafe-actions](https://github.com/piotrwitek/typesafe-actions) makes it easy to implement in that case.

However, **this does not work with random properties.** It's a common complaint people have: if you have a union type where the dependent types have no overlapping properties, you can't check for the existence of one of those properties to determine which type you're looking at it. This **does not work:**

<InternalEmbed title="gistpens/tagged-unions-loading-state" url="/vault/gistpens/tagged-unions-loading-state.md">
```typescript title="union-fail.ts"
type First = {
  prop: number;
};

type Second = {
  value: string;
};

type FirstOrSecond = First | Second;

declare function getFirstOrSecond(): FirstOrSecond;

const thing: FirstOrSecond = getFirstOrSecond();

// TypeScript complains about Second not having a `prop` property.
if (typeof thing.prop === "number") {
  // TypeScript does not know you have a First
  // without an explicit cast
  const prop = (thing as First).prop;
} else {
  const value = (thing as Second).value;
}
```
</InternalEmbed>

Now that we understand what a tagged union type is, we can use this concept to tag our various loading state, and their associated properties:

<InternalEmbed title="gistpens/tagged-unions-loading-state" url="/vault/gistpens/tagged-unions-loading-state.md">
```typescript title="tagged-union-state.ts"
type UnloadedState = {
  status: "unloaded";
};

type LoadingState = {
  status: "loading";
};

type LoadedState = {
  status: "loaded";
  items: Item[];
};

type ErrorState = {
  status: "error";
  error: Error;
};

type State = UnloadedState | LoadingState | LoadedState | ErrorState;
```
</InternalEmbed>

Now, in the switch statement above, we _know_, at the type level, what properties are available to us. No more `null` checking or ugly cast throughs--just a clean description of the various states and their associated and known-to-be-present properties.

## Conclusion

Next time you need to implement a data loading scheme, start off with a version of this, and it'll make your data much easier to extend over time.
