---
tags:
  - talk
  - web
slug: talks/understanding-observables-by-metaphor
title: Understanding Observables by Metaphor
description: RxJS-style observables are a powerful but complex for building reactive applications. This talk is an attempt to understand them by relating them to other concepts we know well.
published_at: 2019-03-20T19:17:36.000Z
updated_at: 2019-03-20T19:17:36.000Z
share: true
---

# Understanding Observables by Metaphor

---

## About Me

James DiGioia, Front-End Tech Lead, Ollie Pets Inc.

Enterprise ecommerce system (Java & .NET)

Developer of brookjs framework

Maintainer of kefir & prism.js

---

## What is an Observable?

> The Observable object represents a push based collection.

[RxJS docs](https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/core/observable.md)

---

## How do we make sense of this?

---

## Agenda

- Lets look at Code
- Excel, the Original Reactive App
- Arrays Over Time
- Lets look at Code Again

---

## Let's Look at Code

---

## Basic Example

---

```html
<div class="block">
  <input type="text" id="input" />
  <div id="result"></div>
</div>
```

---

```javascript
const $input = document.getElementById('input');
const $result = document.getElementById('result');

const input$ = Kefir.fromEvents($input, 'input').map(
  event => event.target.value,
);

input$.observe(result => {
  $result.textContent = result;
});
```

---

## Simple Calculator

---

```html
<div class="calculator">
  <input type="text" id="first" class="number" />

  <select name="operation" id="operation">
    <option value="+">+</option>
    <option value="-">-</option>
    <option value="*">*</option>
    <option value="/">/</option>
  </select>

  <input type="text" id="second" class="number" />

  <div id="result"></div>
</div>
```

---

```javascript
const first$ = Kefir.fromEvents(document.getElementById('first'), 'input').map(
  event => parseInt(event.target.value, 10),
);

const second$ = Kefir.fromEvents(
  document.getElementById('second'),
  'input',
).map(event => parseInt(event.target.value, 10));

const operation$ = Kefir.fromEvents(
  document.getElementById('operation'),
  'change',
)
  .map(event => event.target.value)
  .merge(Kefir.constant('+'));

const result$ = Kefir.combine(
  { f: first$, s: second$, op: operation$ },
  ({ f, s, op }) => {
    if (Number.isNaN(f) || Number.isNaN(s)) {
      return 'ERR';
    }

    switch (op) {
      case '+':
        return f + s;
      case '-':
        return f - s;
      case '*':
        return f * s;
      case '/':
        return f / s;
      default:
        return 'ERR';
    }
  },
);

result$.observe(result => {
  document.getElementById('result').textContent = result;
});
```

---

## Drag and Drop

---

```html
<style>
  #block {
    width: 150px;
    height: 150px;
    position: absolute;
    top: 50px;
    left: 50px;
    background-color: black;
    cursor: pointer;
  }
</style>

<div id="block"></div>
```

---

```javascript
const $block = document.getElementById('block');

const position$ = Kefir.fromEvents($block, 'mousedown')
  .map(e => e.target.getBoundingClientRect())
  .map(rect => ({ top: rect.top, left: rect.left }))
  .flatMap(start =>
    Kefir.fromEvents(document.body, 'mousemove')
      .takeUntilBy(Kefir.fromEvents(document.body, 'mouseup'))
      .map(e => ({
        x: e.movementX,
        y: e.movementY,
      }))
      .scan(
        (acc, movement) => ({
          left: acc.left + movement.x,
          top: acc.top + movement.y,
        }),
        start,
      ),
  );

position$.observe(pos => {
  $block.style.top = pos.top + 'px';
  $block.style.left = pos.left + 'px';
});
```

---

## Our first metaphor: Excel

TODO IMAGE

<!-- ![Excel](src/@talks/prezis/understanding-observables-by-metaphor/excel.png) -->

---

## Cells are independent values

A1 is "2", B1 is "10"

---

## Cells can also be formulas dependent on other cells

C1 is `=SUM(A1, B1)`

C1 syncs with the values from A1 & B1

---

## We can consider Observables the same way

`first$` & `second$` are Excel cells, holding the value of each input field

---

## Observables represent the current data

Data can be derived from other data with functions

---

## Observables can be combined to create new representations of the data

---

`combine` represents the dependent calculation

---

```javascript
Kefir.combine({ f: first$, s: second$, op: operation$ }, ({ f, s, op }) => {
  if (Number.isNaN(f) || Number.isNaN(s)) {
    return 'ERR';
  }

  switch (op) {
    case '+':
      return f + s;
    case '-':
      return f - s;
    case '*':
      return f * s;
    case '/':
      return f / s;
    default:
      return 'ERR';
  }
});
```

---

## It turns your external inputs into data

Any state in your application can be represented this way

---

## Our second metaphor: Arrays Over Time

"push-based collection"

---

## Push-based: Producer pushes values as they happen

vs.

---

## Pull-based: Consumer pulls values when they can be processed

e.g. generators (`next`)

---

## We have collections in JavaScript too

the array

---

## Values are discrete events

`--1---2---3--4|`

`delay(20)`

`----1---2---3--4|`

---

## [RxMarbles.com](http://rxmarbles.com/)

---

## "Take events from A until I get an event from B"

---

```javascript
Kefir.fromEvents(document.body, 'mousemove')
  .takeUntilBy(Kefir.fromEvents(document.body, 'mouseup'))
  .map(e => ({
    x: e.movementX,
    y: e.movementY,
  }))
  .scan(
    (acc, movement) => ({
      left: acc.left + movement.x,
      top: acc.top + movement.y,
    }),
    start,
  );
```

---

## "Take events from A until I get an event from B"

`--m--m----m------m--mmmm---m--m---`

---

`takeUntilBy`

---

`------------------------u---------`

---

`--m--m----m------m--mmmm|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`

---

## Coordinating events is simplified

---

## Let's Look at Code Again

---

## Simple Calculator

```javascript
const first$ = Kefir.fromEvents(document.getElementById('first'), 'input').map(
  event => parseInt(event.target.value, 10),
);

const second$ = Kefir.fromEvents(
  document.getElementById('second'),
  'input',
).map(event => parseInt(event.target.value, 10));

const operation$ = Kefir.fromEvents(
  document.getElementById('operation'),
  'change',
)
  .map(event => event.target.value)
  .merge(Kefir.constant('+'));

const result$ = Kefir.combine(
  { f: first$, s: second$, op: operation$ },
  ({ f, s, op }) => {
    if (Number.isNaN(f) || Number.isNaN(s)) {
      return 'ERR';
    }

    switch (op) {
      case '+':
        return f + s;
      case '-':
        return f - s;
      case '*':
        return f * s;
      case '/':
        return f / s;
      default:
        return 'ERR';
    }
  },
);

result$.observe(result => {
  document.getElementById('result').textContent = result;
});
```

---

## Drag and Drop

```javascript
const $block = document.getElementById('block');

const position$ = Kefir.fromEvents($block, 'mousedown')
  .map(e => e.target.getBoundingClientRect())
  .map(rect => ({ top: rect.top, left: rect.left }))
  .flatMap(start =>
    Kefir.fromEvents(document.body, 'mousemove')
      .takeUntilBy(Kefir.fromEvents(document.body, 'mouseup'))
      .map(e => ({
        x: e.movementX,
        y: e.movementY,
      }))
      .scan(
        (acc, movement) => ({
          left: acc.left + movement.x,
          top: acc.top + movement.y,
        }),
        start,
      ),
  );

position$.observe(pos => {
  $block.style.top = pos.top + 'px';
  $block.style.left = pos.left + 'px';
});
```

---

## Interested in exploring further?

kefir: [github.com/kefirjs/kefir](https://github.com/kefirjs/kefir/)

brookjs: [github.com/valtech-nyc/brookjs/](https://github.com/valtech-nyc/brookjs/)

---

## Thank You

Any questions?
