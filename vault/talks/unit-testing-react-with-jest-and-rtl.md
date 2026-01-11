---
tags:
  - talk
  - web
slug: talks/unit-testing-react-with-jest-and-rtl
title: Unit Testing React with Jest and RTL
description: An introduction to unit testing React component using Jest & @testing-library/react (RTL).
published_at: 2019-08-08T18:51:42.000Z
updated_at: 2019-08-08T18:51:42.000Z
share: true
---

# Unit Testing React with Jest & RTL

---

## About Me

James DiGioia, Front-End Tech Lead, Ollie Pets Inc.

Enterprise ecommerce system (Java & .NET)

Developer of brookjs framework

Maintainer of kefir & prism.js

---

## Agenda

- What is Unit Testing?
- Why Unit Test?
- Unit Testing Principles
- Why Use RTL vs Enzyme?
- Unit Testing a Basic Form Component

---

## What is Unit Testing?

> Unit tests are typically automated tests written and run by software developers to ensure that a section of an application (known as the "unit") meets its design and behaves as intended.

— Wikipedia

---

## Why Unit Test?

- Speed up development cycle
- More confidence in solution
- Documentation of developer intentions
- Reduce regression risk

---

## Unit Testing Principles

- "Units" are ill-defined, so don't stress about it.
- Mock/stub external dependencies as much as makes sense.
- Test a component's API, not its implementation details.
- Achieving 100% coverage in unit tests is rarely a worthwhile goal.

---

## Good testing is about having confidence in your software.

---

## Why Use RTL vs Enzyme?

RTL (react-testing-library) tests components similar to how your users interact with them.

---

## Enzyme

```javascript
const wrapper = mount(<SomeComponent />);

wrapper.instance().someClassMethod();

expect(wrapper.state()).toEqual({ calledClassMethod: true });
```

This is testing an implementation detail.

---

## RTL

```javascript
const { container, getByText } = render(<SomeComponent />);

fireEvent.click(getByText('Submit'));

expect(getByText('Submitted')).toBeInTheDocument();
```

This tests how a user would see the component.

---

## Let's TDD a Login Component!

```bash
npx create-react-app tdd-with-jest
```

---

## Requirements

1. Should not submit unless valid email address is provided
2. Should not submit unless password is greater than 8 characters
3. Should show success message after successful submission

---

# Let's live code this!

---

## Thank You

Any questions?
