---
description: Force Use of Markdown with Markdown-on-Save
status: publish
gistId: ''
sync: false
createdAt: '2015-11-14T16:45:22.000Z'
updatedAt: '2015-11-14T16:45:22.000Z'
blobs:
  - filename: force-markdown.php
    code: |-
      add_filter('wpghs_pre_import_args', function ($args) {
        $args['force_markdown'] = true;

        return $args;
      });
    language: php
---

