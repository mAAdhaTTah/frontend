---
title: 'Array Update Trick: What it is and how it works'
publishedAt: '2018-11-12T18:06:07.000Z'
updatedAt: '2018-11-12T18:06:07.000Z'
menu: content/menus/main.md
header: content/headers/main.md
status: publish
body:
  - content: >
      The other day, I was looking at some code that did an immutable update of
      an array, replacing the value at one index with a new value. It used a
      `slice`-based method, which took 2 spreads and several lines of code after
      prettier was done with it. After looking at it for a bit, I came up with a
      new method for doing this update. Let's take a look at the code and walk
      through how it works:


      ## The code


      Assuming we have array `arr` with three element, `[1, 2, 3]`, and we want
      to update index `1`, here's how we could do it:


      \[gistpen id="5676]


      ## The explanation


      The interesting work happens on line 2, where we call `Array.from`. If
      you're not familiar with `Array.from`, it takes an object and an optional
      mapper function and returns an array. It converts the object into an array
      and optionally calls the mapper function on each element. It can be used
      to convert both iterable and array-like objects into a plain JavaScript
      array.


      The first thing we see is the spread. Note that this is an *object*
      spread, and not an *array* spread, so we're spreading the array's keys
      into a new object with numeric keys. An array's keys are own properties,
      so doing a spread keeps them in the resulting object:


      \[gistpen id="5694"]


      When you spread, you can update keys by placing them after the spread, so
      we can do the below to update the object with new keys.


      \[gistpen id="5697"]


      However, if we attempted to pass this into `Array.from`, it would produce
      an empty array, because the object is neither iterable nor array-like.
      According to
      [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from#Description),
      "array-like" objects are "objects with a `length` property and indexed
      elements." We know the object has numeric keys, but `length` is not
      transferred because it's not
      [enumerable](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/length)
      and object spread only transfers [enumerable own
      properties](http://2ality.com/2016/10/rest-spread-properties.html) of the
      object. In order to make the result "array-like," we need to give it the
      `length` property explicitly.


      The final result again:


      \[gistpen id="5676]


      Immutable array updates can be annoying. Hopefully this little trick will
      make them easier for you.
    _template: richText
excerpt: >
  The other day, I was looking at some code that did an immutable update of an
  array, replacing the value at one index with a new value. It used a
  slice-based method, which took 2 spreads and several lines of code after
  prettier was done with it. After looking at it for a bit, I \[…]
featuredMedia: content/media/metamorphic-rock-outcropping.md
categories:
  - reference: content/categories/web-development.md
_template: standard
---


