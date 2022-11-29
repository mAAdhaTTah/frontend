---
title: 'If you think you need an array in Redux, you probably don''t'
publishedAt: '2019-02-01T21:37:09.000Z'
updatedAt: '2019-02-01T21:37:09.000Z'
menu: content/menus/main.md
header: content/headers/main.md
status: draft
body:
  - content: >
      I'm going to make a bold claim: putting an array of objects in your Redux
      store is always a mistake. I've built a few applications with Redux now,
      and every time I've used an array, I've regretted it. Let's take a look at
      some of the problems it causes, how using an object is superior, and when
      we should use arrays.


      In most naive implementations of the standard todo app, your state looks
      something like this:


      ADD CODE SNIPPET


      When you add a todo in the reducer, it looks like something like this:


      ADD CODE SNIPPET


      All of this *seems* fine at first, but updating now gets a little
      annoying:


      CODE SNIPPET


      You have to iterate over the whole list. For a small todo list, that's not
      a big deal. This only becomes an issue when the list is like... thousands.


      But let's say the app evolves. You add offline capabilities and save
      changes to local storage if the app is offline. When the app comes online,
      you need to fetch the latest state of the todos and merge them into your
      internal representation. If you're merging into an array, this is actually
      pretty difficult, as you need to check whether you have it in your array
      or not before deciding whether to merge it or add it to the array:


      CODE SNIPPET


      For every item in the list you received, you need to loop over the entire
      list of todos, which is not only a lot of code but will turn into a
      performance problem much earlier.


      Instead of maintaining the array of todos, let's instead maintain an
      object of todos:


      CODE SNIPPET


      We need to generate an ID to key off of when we create a new one, but
      otherwise, this is pretty similar to how we added to the array, using
      spread to merge into a new object. We're also going to save the time the
      todo was created--we'll discuss why later.


      Now if we want to update the todo, it's a lot easier:


      CODE SNIPPET


      Instead of needing to search through every element in the array, we can
      easily access the current todo and merge it in to update the properties we
      need. This no longer requires looping through the array with less code.


      But merging the array is by far the easiest:


      CODE SNIPPET


      We don't even have to look. If the id matches, it gets overwritten; if
      not, added. We could also merge it in with our offline changes, if that's
      what we needed to do.


      We do have a bit of a problem: most view libraries need the value passed
      as an array. In order to transform it into an array, we need to derive the
      sort order from the list of values:


      CODE SNIPPET


      This is why we saved the date when we created the todo in the first place.
      If you're worried about performance here, use reselct to memoize the
      result. Then only if the object changes, then calculation is rerun.


      You can use whatever value you need to sort it by, or even different
      sorting mechanisms based on a flag or other means. If a list can be sort
      arbitrarily by the user, then you've got a good case for an array to
      maintain that. However, the array should only contain a list of ids:


      CODE SNIPPET


      We can then derive the list by mapping over the array of ids:


      CODE SNIPPET


      This can also be memoized with reselect.


      While there are instances where you want an array to represent some data,
      it should hold the barest minimum needed in order to handle the sort
      order. Any additional information should be maintained in the object
      itself.


      Overall, you want to make sure your data is normalized and you're only
    _template: richText
excerpt: >
  I’m going to make a bold claim: putting an array of objects in your Redux
  store is always a mistake. I’ve built a few applications with Redux now, and
  every time I’ve used an array, I’ve regretted it. Let’s take a look at some of
  the problems it causes, how using an object is superior, \[…]
featuredMedia: null
_template: standard
---

