---
description: Use WordPress-GitHub Sync with Markdown-on-Save
status: publish
gistId: ''
sync: false
createdAt: '2015-08-31T10:52:32.000Z'
updatedAt: '2015-08-31T10:52:32.000Z'
blobs:
  - filename: add-filter.php
    code: |-
      add_filter('wpghs_content_export', function($content, $wpghs_post) {
          return $wpghs_post->post->post_content_filtered;
      });
    language: php
---

