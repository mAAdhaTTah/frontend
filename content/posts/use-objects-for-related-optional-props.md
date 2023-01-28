---
title: Use objects for related optional props
publishedAt: '2021-11-08T00:15:03.000Z'
updatedAt: '2021-11-08T00:15:03.000Z'
menu: content/menus/main.md
header: content/headers/main.md
status: draft
body:
  - content: >
      When you're building React components, you'll often end up in situations
      where you have an optional subcomponent that takes multiple props. The
      most common example is an image, which we'll explore below, but this can
      easily apply to links or other other configurable children. Let's take a
      look at this example, a problem with a common approach, and an elegant
      solution.


      Let's say we're building a basic media component, which optionally
      displays an image if you provide one. You might start by writing it
      something like this:
    _template: richText
  - repo: content/repos/objects-for-related-optional-props.md
    blob: CardNaive.js
    highlight: ''
    offset: 0
    _template: gistpenEmbed
  - content: >
      Great! Everything looks good, image is optional, ship it. "Wait!" Your
      intrepid coworker takes a look at this code and points out the `img`
      doesn't have an `alt` tag. That's bad for accessibility.


      No problem, we can add an alt tag.
    _template: richText
  - repo: content/repos/objects-for-related-optional-props.md
    blob: add-alt.js
    highlight: ''
    offset: 0
    _template: gistpenEmbed
  - content: >
      But this code has a problem: `imageAlt` isn't required if `imageSrc` is
      provided. You can still end up with an inaccessible image if another
      developer comes along and provides one with the other.


      The basic problem is we have props that are related to each other that
      don't express that relationship via the props structure. Instead, we could
      explicitly express this relationship by providing `image` as an object:
    _template: richText
  - repo: content/repos/objects-for-related-optional-props.md
    blob: img-obj-prop.js
    highlight: ''
    offset: 0
    _template: gistpenEmbed
  - content: ''
    _template: richText
excerpt: >
  When you’re building React components, you’ll often end up in situations where
  you have an optional subcomponent that takes multiple props. The most common
  example is an image, which we’ll explore below, but this can easily apply to
  links or other other configurable children. Let’s take a look at this example,
  a problem with a \[…]
featuredMedia: null
categories:
  - reference: content/categories/uncategorized.md
_template: standard
---


