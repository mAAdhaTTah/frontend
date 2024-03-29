---
title: useEffect's function dependency pitfall
publishedAt: '2020-08-17T16:50:45.000Z'
updatedAt: '2022-07-26T02:56:36.000Z'
menu: content/menus/main.md
header: content/headers/main.md
status: publish
body:
  - content: >
      [`useEffect`](https://reactjs.org/docs/hooks-effect.html) is a powerful
      hook provided in React 16.8, allowing you to sync data with the outside
      world. One of the minor annoyances with `useEffect` is its dependency
      array, which indicates to `useEffect` when it should rerun. Adding a
      function to the dependency array can cause major problems with
      `useEffect`. Let's take a look at an example where adding a function
      `useEffect`'s dependency array causes problems for our React application.


      ## A look at the problem


      The other day, I got a question from a developer on my team. She was
      working on some cart related functionality, and ESLint was complaining
      about the following code:
    _template: richText
  - repo: content/repos/useeffect-dependency-array-issues.md
    blob: useEffect-issue.js
    highlight: ''
    offset: 0
    _template: gistpenEmbed
  - content: "`refreshCart` is a function that does exactly what it says: Refresh the cart & save the data to [Context](https://reactjs.org/docs/context.html). The cart is something that's used throughout the application, so we set it up as a Context for easy reuse. In this case, it was [`eslint-plugin-react-hooks`](https://www.npmjs.com/package/eslint-plugin-react-hooks) warning about a missing dependency, the `refreshCart` function.\n\n## A stroll through `useEffect`\n\nFirst, let's talk about what the second parameter, the dependency array, is doing.\_`useEffect`\_says \"if any dependency in this array changes, rerun the effect\". Think about this as a \"synchronization mechanism\", keeping your Component's data & some external side effect in sync with each other.\n\nWe have a great example of this in our app: On one page, we want to load a list of potential plans based on what the user has entered into the form. As the user changes the values in the form, we make a new API request to fetch those plans with `useEffect`, keeping the latest request in sync with form data and cleaning up the previous request as we go.\n\nSo there are consequences to leaving values out of the dependency array. It can cause issues where the effect doesn't run when you expect it to, or is running selectively when some data changes but needs to run when all of the data changes, or functions are running with stale data. The ESLint rules call this out so you can handle it.\n\n## The problem with `refreshCart`\n\nThe reason this is annoying in\_*this*\_case is\_`refreshCart`\_is defined within the scope of the component, so it's\_*created fresh*\_on every render. If you were to just stuff it into the dependency array as it tells you, you'd get an infinite loop. On initial mount, the effect would call the function, which fetch the cart & saves the data, triggering a render. When it does, it would see\_`refreshCart`* as a new reference*. `useEffect`\_goes \"oh hey, my dependency changed, I should rerun the effect\", starting the whole cycle over again.\n\nNote that you only have this problem with functions created with in the component function. If you can hoist the function out of the component scope, ESLint will stop complaining because `useEffect` will see the same function reference on every render.\n\nWe could do that in this case because `refreshCart` saves the data to a `useState` hook. This state is eventually passed into the Cart context mentioned earlier, so we need `refreshCart` to be within the component scope so it has access to `setCartContext`, the setter returned by `useState`.\n\n## What we can do about it\n\nThere are a couple solutions to this:\n\n1. Wrap\_`refreshCart`\_in\_`useCallback`, a specialized version of\_`useMemo`. Similar to `useEffect`, `useMemo` calls the callback provided whenever any of the dependencies changes, but instead of performing a side effect, it memoizes the return value. This is helpful for minimizing the number of times you recalculate a value as well as maintaining references between renders. In the latter case, `useCallback` provides a specialized version of `useMemo` for creating callbacks, where the function reference is reused if the dependencies haven't changed.\n2. Assign `refreshCart` to a ref created with `useRef`. ESLint doesn't complain about ref usage in effects because they're intentionally designed for mutable data. If you do this, you can create a singleton that you assign on first render and never touch again. If you mutate it further, it could cause issues in Concurrent Mode in the future. You can use this if you know for certain there are no dependencies or they will never change.\n3. Tell eslint to shut up with\_`eslint-disable-next-line`. Generally, eslint yells at you about these things for good reasons, so this is really a last resort if neither of the above solutions work for various reason. If you do go this route, you should always leave a comment as to why.\n\n### Solution 1\n\nIf we assume our `refreshCart` function looks something like this:\n"
    _template: richText
  - repo: content/repos/useeffect-dependency-array-issues.md
    blob: refreshCart.js
    highlight: ''
    offset: 0
    _template: gistpenEmbed
  - content: |
      Then we can wrap the function in `useCallback` like this:
    _template: richText
  - repo: content/repos/useeffect-dependency-array-issues.md
    blob: refreshCart-useCallback.js
    highlight: ''
    offset: 0
    _template: gistpenEmbed
  - content: >
      In this case, which is similar to our real application, we can leave out
      `setCart` as a dependency. ESLint knows that `setCart` will always be the
      same reference because `useState` (as well as `useReducer`) returns a
      stable function reference as the second value in the array. If your
      function has additional dependencies, ESLint can fix that for you
      automatically. Wrap your `refreshCart` equivalent in `useCallback` with an
      empty dependency array and run `eslint --fix`.


      ### Solution 2


      In the above example, we know for sure that everything we're using in the
      function is a stable reference and won't change over time. If you're
      positive this is the case, and you know that won't eventually change, you
      can instead assign the function to a ref with `useRef`.
    _template: richText
  - repo: content/repos/useeffect-dependency-array-issues.md
    blob: refreshCartRef.js
    highlight: ''
    offset: 0
    _template: gistpenEmbed
  - content: >
      Couple of things to be aware of here:


      1. We only create the function once, the first time the reference is
      created. On future renders, `refreshCart.current` will point to the same
      function reference as the initial render, so the `if` block won't run.
      This *will* cause a problem if `refreshCart` references values outside of
      its scope that change over time. This is know as the "stale closure
      problem". One way you can avoid this problem is using the callback form of
      `setState`, which eliminates the dependency on the state value itself.

      2. You *must* use the ref directly in `useEffect` in order to keep ESLint
      from complaining. Because ESLint knows that refs are designed for mutable
      data, it knows not to include them in `useEffect`'s dependency array.


      The "stale closure problem" is a big potential issue here, so it's worth
      emphasizing: You *will* end up with unexpected behaviors if you rely on
      `useState` values, props, or other changing values within your
      `refreshCart`. This is because the [closure captures the values in its
      scope](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures).
      Because the function is never recreated, it never captures the updated
      values in its scope. Hence "stale closure problem."


      ### Solution 3


      As a last resort, and if you know exactly what you're doing and what the
      consequences are, you can always tell ESLint to leave you alone. If you
      choose to go this route, be sure to leave a comment explaining *why*, so
      future you knows what the thinking was. Additionally, you should disable
      the specific rule that ESLint is complaining about, so if that part of the
      code has additional problems, ESLint will still complain about them.
    _template: richText
  - repo: content/repos/useeffect-dependency-array-issues.md
    blob: refreshCart-eslint-disable.js
    highlight: ''
    offset: 0
    _template: gistpenEmbed
  - content: >
      Now, if you come back to this, you know why this rule was disabled, what
      the purpose is, and whether that logic still applies. If you're making
      changes to `refreshCart`, you may want to refactor this code into one of
      the above solutions.


      ## Conclusion


      The ESLint plugin is incredibly helpful for catching situations like this,
      and with these tools in your tool belt, you can choose the best answer for
      your situation. I would also argue this is the preference order for these
      3 solutions; do `useCallback` first. There are good reason to use the
      other two, and you should have them available to you, but all of these are
      dependent on *how the code will change*. The less likely it is to change,
      the further down the list you can go. However, `useCallback` (&
      `useMemo`!) leans *into* the way hooks are designed, with the dependency
      array linking everything all the way back. That's why it's the best
      solution for the common case and what you should reach for first.
    _template: richText
excerpt: >
  useEffect is a powerful hook provided in React 16.8, allowing you to sync data
  with the outside world. One of the minor annoyances with useEffect is its
  dependency array, which indicates to useEffect when it should rerun. Adding a
  function to the dependency array can cause major problems with useEffect.
  Let’s take a look at \[…]
featuredMedia: content/media/pitfall-trap.md
categories:
  - reference: content/categories/uncategorized.md
_template: standard
---


