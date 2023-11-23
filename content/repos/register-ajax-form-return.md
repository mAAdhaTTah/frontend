---
description: Register Ajax Form Return
status: publish
gistId: none
sync: true
createdAt: '2015-02-14T18:37:01.000Z'
updatedAt: '2015-02-14T18:37:01.000Z'
blobs:
  - filename: register-ajax.php
    code: |-
      add_action( 'wp_ajax_plugin_slug_insert_dialog', 'plugin_slug_insert_gistpen_dialog' );

      function plugin_slug_insert_gistpen_dialog() {
          die(include 'path/to/dialog/form.php');
      }
    language: php
---

