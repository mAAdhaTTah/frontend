---
description: Recursive Closures in PHP
status: publish
createdAt: '2015-10-26T21:37:38.000Z'
updatedAt: '2015-10-26T21:37:38.000Z'
blobs:
  - filename: graph
    code: |2-
                "kind"
                /
              "type"
          /     |     \
      widget widget widget
  - filename: recursion.js
    code: |-
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
    language: js
  - filename: recursion.php
    code: |-
      $widgets = [...arrayOfWidgets];

      $remove = function($widgetId) use (&$widgets, &$remove) {
          foreach ($widgets[$widgetId]->getChildWidgetIds() as $childWidgetId) {
              $remove($widgets[$childWidgetId]);
          }

          unset($widgets[$widgetId]);
      };

      $remove($widgets[widgetId]);
    language: php
---

