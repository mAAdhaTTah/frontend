---
title: Creating Your Own WordPress Unit Test Factories
publishedAt: '2014-09-29T19:32:52.000Z'
updatedAt: '2014-09-29T19:37:09.000Z'
status: publish
body:
  - content: >
      I did something like this in developing the tests for WP-Gistpen. In my
      case, I took the default `post` factory, as he details it, and changed the
      `post_type` to 'gistpen'. I was actually going to write a thing about it
      myself, but he got to it first, so I'm just going to repost his. You can
      see my factory
      [here](https://github.com/mAAdhaTTah/WP-Gistpen/blob/develop/test/includes/factory.php).


      One of the things I'll add that wasn't mentioned in the original article
      is that you might want to add your new factory as part of the test unit's
      general factory, which is what the first class does. I then extend the
      [testunit
      case](https://github.com/mAAdhaTTah/WP-Gistpen/blob/develop/test/includes/testcase.php)
      to insert my new factory, as well as add a few helper functions I used
      throughout the test.
    _template: richText
link:
  url: 'http://codesymphony.co/creating-your-own-wordpress-unit-test-factories/'
_template: link
---

