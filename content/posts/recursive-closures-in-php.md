---
title: Recursive Closures in PHP
publishedAt: '2015-10-26T21:37:38.000Z'
updatedAt: '2015-10-26T21:37:38.000Z'
menu: content/menus/main.md
header: content/headers/main.md
status: publish
body:
  - content: >
      I don't know how often this comes up, but I recently needed to create a
      one-off recursive function. Here's how I did it in PHP.


      In this case, I had a set of items that were both nested and could be
      disabled at any level. So you could have a 3 widgets, all of a type
      "useful", and all of the "useful" level widgets were then grouped by
      "kind".<FootnoteReference id="1" /> Represented visually something like
      this:


      ```
               "kind"
                /
             "type"
         /     |     
      widget widget widget

      ```


      (Insofar as that graph has any meaning to anyone.)


      Imagine this extending outwards, so there were many "types", each with 2
      or 3 widgets, and each "kind" then has 2 or 3 "types". If any "type" has
      no widgets, it too gets disabled; same for "kind." And obviously, the
      total universe of things has many kinds.


      My problem was that these items could be disabled at any time, at any
      level, and when that happens, it and all of its "children" needed to be
      removed. Given our particular data structure, this turned into a 3 step
      process, but the first was to check for deactivated items.


      So we need to go through each item, and check that it is both active (as
      per the dates set) as well as has children (except for the widget level).
      Ultimately, we needed to write a function that's used in this one context.


      The obvious solution is to just create a method that has a name that could
      be called, which is certainly doable but not really necessary if you have
      a very small method that's only used once.


      Another option is to use a closure. In JavaScript, it's pretty easy to
      write one of these, as the variables within the function's scope are
      accessible when the function is run:


      ```

      var widgets = [...arrayOfWidgets];

      var remove = function(widgetId) {
          widgets[widgetId].getChildWidgetIds().forEach(function(childWidgetId) {
              // `remove` is defined and accessible
              // at the time this is called
              remove(widgets[childWidgetId]);
          });

          delete widgets[$pageId];
      };


      remove(widgets[pageId]);

      ```


      But we can't do this as directly in PHP, because we don't have closure
      scoping, and its closest equivalent, the `use` statement will throw an
      error if the variable hasn't been defined when it's made available to the
      closure at runtime. In order to get around this, we need to pass the name
      of the variable *by reference*:


      ```

      $widgets = [...arrayOfWidgets];

      $remove = function($widgetId) use (&$widgets, &$remove) {
          foreach ($widgets[$widgetId]->getChildWidgetIds() as $childWidgetId) {
              $remove($widgets[$childWidgetId]);
          }

          unset($widgets[$widgetId]);
      };


      $remove($widgets[widgetId]);

      ```


      This makes the `$remove` variable function kind of like JavaScript's
      closure scoping. At the time the closure is defined, the reference is to
      the value of a variable that doesn't exist yet. When the closure is
      executed, the reference will be the closure assigned to that
      variable.<FootnoteReference id="2" /> You're using the same variable
      within the closure as outside. This way, the closure can use and call
      itself recursively, until it's done what it needs to do.


      And that's how you do recursive closures in PHP.


      Just note one thing: with XDebug turn on, the stack depth is limited to
      200, and it will error out if it goes deeper than that. You can increase
      it, obviously, in your `php.ini` settings; otherwise, PHP's max stack
      depth is limited by [its memory allocation at
      runtime](http://stackoverflow.com/questions/7327393/why-does-an-infinitely-recursive-function-in-php-cause-a-segfault),
      generally speaking. On the other hand, JavaScript's max stack depth
      [varies by
      browser](http://stackoverflow.com/questions/7826992/browser-javascript-stack-size-limit)
      and implementation.


      <FootnoteDefinition id="1">
        Specifics redacted to protect the guilty.
      </FootnoteDefinition>


      <FootnoteDefinition id="2">
        Which, curiously, is an object in PHP, with the magic method `__invoke` defined as the closure.
      </FootnoteDefinition>
    _template: richText
excerpt: >
  I don’t know how often this comes up, but I recently needed to create a
  one-off recursive function. Here’s how I did it in PHP. In this case, I had a
  set of items that were both nested and could be disabled at any level. So you
  could have a 3 widgets, all of a \[…]
featuredMedia: content/media/recursion.md
categories:
  - reference: content/categories/technology.md
_template: standard
---


