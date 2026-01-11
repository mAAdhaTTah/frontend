---
tags:
  - talk
  - web
slug: talks/optional-chaining-and-nullish-coalescing
title: Optional Chaining and Nullish Coalescing
description: Optional Chaining & Nullish Coalescing are two new features introduced to the JavaScript language. Let's take a look at what they are and how they work together.
published_at: 2020-04-01T17:42:31.000Z
updated_at: 2020-04-01T17:42:31.000Z
share: true
---

# Optional Chaining (`?.`) and Nullish Coalescing (`??`)

---

## About Me

James DiGioia, Front-End Tech Lead, Ollie Pets Inc.

Enterprise ecommerce system (Java & .NET)

Developer of brookjs framework

Maintainer of kefir & prism.js

---

## Agenda

- What is this new syntax?
- How do they work together?
- What's the best way to use them?

---

## Nullish

_adj._

`null` or `undefined`

---

## What is this new syntax?

---

## Optional Chaining

Optional Chaining allows a developer to handle many cases of nested, potentially nullish values.

If the left-hand side of the operator is null or undefined, then the operator "short-circuits" and returns `undefined` immediately. Otherwise, continue with the chain.

---

## Example

```typescript
interface Person {
  firstName: string;
  lastName: string;
  address?: Address;
  speak?: () => void;
  pets?: string[];
}
```

```typescript
interface Address {
  street: string;
  apt?: string;
  city: string;
  state: State;
  zip: number;
}
```

```typescript
interface State {
  displayName: string;
  code: string;
}
```

---

## Example

```javascript
const zip = person.address?.zip;
```

```javascript
const firstPet = person.pets?.[0];
```

```javascript
person.speak?.();
```

---

## Nullish Coalescing

Nullish Coalescing allows a developer to provide a default value for potentially nullish values.

If the left-hand side of the operator is `null` or `undefined`, then the right hand side of the operator is returned.

---

## Example

```javascript
const pets = person.pets ?? [];
```

---

## How do they work together?

---

These two features were tied together to enable developers to access deeply nested properties and provide reliable fallbacks if they're not available.

---

## (Contrived) Example

```javascript
const petCountDisplay = person.pets?.length ?? 'Pets not provided';
```

---

## How should we use this?

---

## Best Practices

- **DO**: Use Optional Chaining to simplify your presence checks.
- **DON'T**: Use Optional Chaining on every access "for protection".
- **DO**: Use Nullish Coalescing when falsey values should be retained.
- **DON'T**: Expect Nullish Coalescing to provide defaults for empty strings and 0.

---

## DO: Use Optional Chaining to simplify your presence checks.

```javascript
const c = a && a.b && a.b.c;
```

```javascript
const c = a?.b?.c;
```

Look at that readability!

---

## DON'T: Use Optional Chaining on every access "for protection".

```javascript
const zip = person?.address?.state?.displayName;
```

What's "nullish" here? Not everything!

---

## DO: Use Nullish Coalescing when falsey values should be retained.

```javascript
const petCountDisplay = person.pets?.length ?? 'Pets not provided';
```

We definitely want to maintain "0" here.

---

## DON'T: Expect Nullish Coalescing to provide defaults for empty strings and 0.

```javascript
const apt = person.address?.apt ?? 'No apt provided';
```

An empty string should fall back. Use `||`.

---

## Thank You

Any questions?
