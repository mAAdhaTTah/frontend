---
title: 'React Testing Tip: Reduce test duplication with a component render function'
publishedAt: '2020-04-27T12:56:00.000Z'
updatedAt: '2022-12-10T01:30:38.000Z'
menu: content/menus/main.md
header: content/headers/main.md
status: publish
body:
  - content: >
      Whenever you write new tests for your React components, you'll probably
      find your tests reusing the same interactions as tests you've already
      written. In multiple tests, you'll click a button or change an input and
      assert that the React component you're testing updates as expected. This
      comes up often enough when testing that I like to start my tests by making
      those interactions reusable. Let's look at how we can do that.


      ## Basic Tests


      For testing React component, I use [Jest](https://jestjs.io/) &
      [@testing-library/react](https://testing-library.com/docs/react-testing-library/intro).
      For this example, we're going to be testing this basic form:
    _template: richText
  - repo: content/repos/component-render-function.md
    blob: form.js
    highlight: ''
    offset: 0
    _template: gistpenEmbed
  - content: >
      We need to write at least 2 tests for this. First, we'll attempt to submit
      the form immediately and check that it fails because the form does not
      have a value yet. Then we'll test changing the value in the form and then
      submit it, and it should succeed with the value. Let's take a look:
    _template: richText
  - repo: content/repos/component-render-function.md
    blob: form.spec.js
    highlight: ''
    offset: 0
    _template: gistpenEmbed
  - content: >
      In both tests, we create a mock function with `jest.fn()` to provide to
      the rendered `Form` component. In the first test, we assert that this mock
      function has not been called, as we don't want an empty value sent to the
      `submit` function. In the second test, we first change the value in the
      form field then submit the form. This time, we succeed, as we have a valid
      value in the form.


      ## Writing a render function


      These are small tests, but we already see some duplication. The `button`
      is queried with the same code twice, the `change` call is verbose, and
      `render` is the same in both tests. All of this would be more readable if
      we had reusable functions for all of it. Let's create a `renderForm`
      function that will reduce this duplication:
    _template: richText
  - repo: content/repos/component-render-function.md
    blob: renderForm.js
    highlight: ''
    offset: 0
    _template: gistpenEmbed
  - content: >
      All of the repeated logic is bundled up in named functions and we can use
      it like this:
    _template: richText
  - repo: content/repos/component-render-function.md
    blob: Form-with-renderForm.spec.js
    highlight: ''
    offset: 0
    _template: gistpenEmbed
  - content: >
      These tests provide a much clearer explanation of what is supposed to
      happen, and we could easily add a third test if we wanted to confirm
      changing back to an empty string still results in `submit` not being
      called:
    _template: richText
  - repo: content/repos/component-render-function.md
    blob: Form-extra-test.spec.js
    highlight: ''
    offset: 0
    _template: gistpenEmbed
  - content: >
      Now we're really starting to see the benefits of this render function!
      Less code duplication, as we can reuse these `fire` functions, but more
      importantly, if the way we need to query the element changes, we only have
      to change it one place. If we decided to change the label on the `input`
      field (which we should, because "Type" isn't very descriptive), we only
      have to change it in the `renderForm` function.


      ## Introducing `react-testing-kit`


      Because this pattern has been so useful to me, I created a package to make
      creating them easier called
      [react-testing-kit](https://github.com/mAAdhaTTah/react-testing-kit).
      Let's take a look at how we can simplify this code with it:
    _template: richText
  - repo: content/repos/component-render-function.md
    blob: renderForm-rtk.js
    highlight: ''
    offset: 0
    _template: gistpenEmbed
  - content: >
      RTK passes `elements` created in that function to the `fire` function and
      returns the result of all of those functions when you create a new
      instance. Let's update the last test to use this function:
    _template: richText
  - repo: content/repos/component-render-function.md
    blob: Form-rtk.spec.js
    highlight: ''
    offset: 0
    _template: gistpenEmbed
  - content: >
      Very similar but less boilerplate.


      ## Conclusion


      We can simplify all of our tests with
      [react-testing-kit](https://github.com/mAAdhaTTah/react-testing-kit). If
      this looks like it would improve your code, [check out the
      project](https://testing-library.com/docs/react-testing-library/intro) and
      let me know what you think!
    _template: richText
excerpt: >
  Whenever you write new tests for your React components, you’ll probably find
  your tests reusing the same interactions as tests you’ve already written. In
  multiple tests, you’ll click a button or change an input and assert that the
  React component you’re testing updates as expected. This comes up often enough
  when testing that I like \[…]
featuredMedia: content/media/react-testing-kit-example.md
_template: standard
---

