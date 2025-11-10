---
tags:
  - talk
  - web
slug: talks/brookjs-at-reactnyc
title: brookjs at ReactNYC
description: brookjs was a web framework based on observables. That framework is now archived, but this was a look at some of the principles underlying it.
published_at: 2017-07-02T17:43:22.000Z
updated_at: 2017-07-02T17:43:22.000Z
share: true
---

# Meet `brookjs`

A framework for building streaming web applications.

---

## About Me

James DiGioia, Front-End Tech Lead, Ollie Pets Inc.
Enterprise ecommerce system (Java & .NET)
Developer of brookjs framework
Maintainer of kefir & prism.js

---

- React/Redux: Declarative DOM & one-way data
  - Functional programming
- Cycle.js: Everything is a stream
  - streams/observables
- Meet `brookjs`

---

## Let's talk about React

---

### I love declarative views!

What do I want? vs. How do I get there?

```jsx
export default ({ handleOnClick, text }) => (
  <button className="button" onClick={handleOnClick}>
    {text}
  </button>
);
```

Views as pure functions,
and functions are awesome.

---

Pure functions are testable

```jsx
import { pureFunction } from "../";

describe("pure function", () => {
  it("should just use its arguments", () => {
    expect(pureFunction("arg1", "arg2")).to.deep.equal({
      my: "value",
    });
  });
});
```

Works for views too.

---

### Tests are the best!

Want to reduce bugs? Prevent regressions? Test your code!

---

### Thinking in React means thinking declaratively and functionally

---

### Immutable Data

```js
const admins = [luigi, mario, peach, toad];

// meanwhile...?
admins.push(bowser);
```

How did this get here?

Make a copy instead

---

### Map, Filter Reduce

```js
const numbers = [1, 2, 3];

console.log(numbers.map((x) => x * x)); // [1, 4, 9]
console.log(numbers.filter((x) => x > 1)); // [2, 3]
console.log(numbers.reduce((total, next) => total + next)); // 6

console.log(numbers); // [1, 2, 3]
```

New array is returned from each call

– Immutable! Pure!

---

## Redux & Unidirectional Data

---

Functional state changes make me happy

No surprises!

```js
function reducer(state = 0, action) {
  switch (action.type) {
    case "CLICK":
      return state + 1;
    default:
      return state;
  }
}
```

Pure function and testable!

---

## Cycle.js

---

### Streams/Observables

functional reactive programming (frp)

---

### What are Observables?

> The Observable object represents a push based collection.

[RxJS docs](https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/core/observable.md)

---

### Real-World Example: Stream of Events

Standard event listener:

```js
const input = document.querySelector("input");

input.addEventListener("input", (e) =>
  console.log("Updated value", input.value),
);
```

Observable:

```js
const events$ = Observable.fromEvent(document.querySelector("input"), "input");

events$.subscribe((e) => console.log("Updated value", input.value));
```

Looks basically the same, right?

---

- An array whose values arrive over time
- Convert inputs into data
- Self-cleaning

---

```js
const values$ = events$.map((e) => e.target.value);
values$.subscribe((value) => console.log("Updated value", value));

const long$ = values$.filter((value) => value.length > 10);
long$.subscribe((value) => console.log(`${value} is long enough`));

const short$ = values$.filter((value) => value.length <= 10);
short$.subscribe((value) => console.log(`${value} is too short`));

const reduce$ = events$.scan((acc, e) => acc + e.target.value, "");
reduce$.subscribe((value) => console.log(value));
```

---

Observables simplify dealing with events over time

JavaScript is **all about** events over time

---

Cycle.js is a pure function

```js
function main(sources) {
  const input$ = sources.DOM.select(".field").events("input");
  const name$ = input$.map((ev) => ev.target.value).startWith("");
  const vdom$ = name$.map((name) =>
    div([
      label("Name:"),
      input(".field", { attrs: { type: "text" } }),
      hr(),
      h1("Hello " + name),
    ]),
  );

  return { DOM: vdom$ };
}
```

---

Observables are passed to `main`

Observables are returned from `main`

Observables wrap side effects

_Observables all the way down_

---

## Drumroll Please

---

```js
export default function MyComponent(el, props$) {
  const events$ = Kefir.fromEvent('click', el).map(() => ({ type: 'CLICK' })))
  const render$ = props$.flatMapLatest(props => render(el, props))

  return Kefir.merge([
    events$,
    render$
  ])
}
```

At its core, this is the mental model for a `brookjs` component

---

### Example Component

```js
export default component({
  children: children({
    button: {
      factory: ButtonComponent,
      preplug: (instance$) => instance$.map(() => ({ type: "FORM_CLICK" })),
    },
  }),
  events: events({
    onInput: (event$) =>
      event$.map((event) => ({
        type: "FORM_TEXT_CHANGE",
        payload: { value: event.target.value },
      })),
  }),
  render: render(template),
});
```

---

Templates are defined with handlebars:

```js
<div class="form" {{#container "form"}}>
    <input type="text" value="{{{text}}}" {{#event "onInput"}}>
    {{> button/index }}
</div>
```

---

How do we handle side effects, e.g. APIs, localStorage, cookies, etc.?

_Observables all the way down._

---

#### Example Delta

```js
import { ofType, Kefir } from "brookjs";
import { SAVE_BUTTON_CLICK } from "../actions";
import { api } from "../services";

export default function apiDelta(actions$, state$) {
  return state$
    .sampledBy(actions$.thru(ofType(SAVE_BUTTON_CLICK)))
    .flatMapLatest((state) =>
      api
        .saveUser(state.user)
        .map(saveUserSuccess)
        .flatMapErrors((err) => Kefir.constant(saveUserFail(err))),
    );
}
```

- Concise logic for side effects
- Error handling
- Testable?

---

Deltas can be tested if you mock the services

```js
import { SAVE_BUTTON_CLICK } from '../actions'

export default ({ api }) => (actions$, state$) =>
  state$.sampledBy(actions$.thru(ofType(SAVE_BUTTON_CLICK)))
    .flatMapLatest(state => api.saveUser(state.user)
      .map(saveUserSuccess)
      .flatMapErrors(err => Kefir.constant(saveUserFail(err)))
    )
)
```

---

Use `chai-kefir` to test the resulting Observable

```js
describe("apiDelta", () => {
  it("should save user", () => {
    const services = {
      api: { saveUser: sinon.spy(() => Kefir.constant(response)) },
    };
    const actions$ = stream();
    const state$ = send(prop(), [value(initial)]);

    expect(apiDelta(services)(actions$, state$)).to.emit(
      [value(responseSuccess(response))],
      () => {
        send(actions$, [value(buttonClick())]);
      },
    );
    expect(api.saveUser).to.haveBeenCalledWith(args);
  });
});
```

---

```js
import { createStore, combineReducers } from "redux";
import { domDelta } from "brookjs";
import { init } from "./actions";
import { userDelta } from "./delta";
import { el, view } from "./dom";
import { user } from "./reducer";
import { selectProps } from "./selector";
import { api } from "./service";

const { __INITIAL_STATE__ } = global;

const store = createStore(
  combineReducers({ user }),
  __INITIAL_STATE__,
  applyDelta(domDelta({ el, selectProps, view }), userDelta({ api })),
);

store.dispatch(init());
```

---

Application architecture

![architecture.png](/vault/_meta/attachments/architecture.png)

---

### Current Status

- Stable API
- Complete documentation
- Full architecture

---

Try it out, play with it, report bugs

Let me know your experience with it!

[On GitHub: https://github.com/valtech-nyc/brookjs](https://github.com/valtech-nyc/brookjs)

[Documentation: https://valtech-nyc.github.io/brookjs/](https://valtech-nyc.github.io/brookjs/)

---

# Thank You

Any questions?
