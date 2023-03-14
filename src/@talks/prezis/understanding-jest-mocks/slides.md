## `jest.useFakeTimers`

- Mock timer functions like `setTimeout`
- Backed by `@sinonjs/fake-timers`
- `jest.useFakeTimers()` to activate
- Once activated, timers won't run automatically
  - Need to be advanced manually
- Enables easier testing of async timers

---

## `jest.useFakeTimers`

```js
jest.useFakeTimers();
const doThingIn30ms = cb => setTimeout(cb, 30);
it('calls the callback after', () => {
  const cb = jest.fn();

  doThingIn30ms(cb);

  expect(cb).not.toBeCalled();

  jest.advanceTimersByTime(30);

  expect(cb).toBeCalled();
});
```

---

## Mocking modules with `jest.mock`

- This is what most people find difficult
- So let's start with a look at the module system

---

## How CommonJS works

- Call `require`
- Node module resolution algorithm finds the file

---

## How CommonJS works

- For relative paths, easy (it exists in the specified location or it doesn't)
- For bare identifiers, search the nearest `node_modules` folder then traverse upwards

---

## How CommonJS works

- Module is wrapped in a function that injects file-specific variables

```js
(function (exports, require, module, __filename, __dirname) {
  // Module code actually lives in here
});
```

---

## How CommonJS works

- Once the function is executed, `module.exports` is returned from `require`

---

## How CommonJS works

#### In sum:

1. `require` the file
2. Resolve & execute it
3. Return `module.exports`

---

## `jest.mock`

- Jest transpiles ESM -> CommonJS
- `jest.mock` intercepts step 2

---

## `jest.mock`

```js
jest.mock('./module', () => ({
  // put the new exports here
}));
```

---

## Reusing mocks

- `__mocks__` folder is special
- At the root level, `__mocks__` mocks `node_modules`
- Mocks of `node_modules` are mocked automatically
- Within the project, need to be enabled with `jest.mock`

---

## [Example](https://codesandbox.io/p/sandbox/jest-mock-sandbox-mw7u82?file=/src/MakeApiCall.spec.js)
