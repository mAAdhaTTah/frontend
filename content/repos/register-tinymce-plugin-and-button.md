---
description: Register TinyMCE Plugin and Button
status: publish
gistId: none
sync: true
createdAt: '2015-02-14T18:37:14.000Z'
updatedAt: '2015-02-14T18:37:14.000Z'
blobs:
  - filename: register-tiny-mce-plugin.php
    code: "add_filter( 'mce_external_plugins', 'plugin_slug_add_button' );\nfunction plugin_slug_add_button( $plugins ) {\n\t$plugins['plugin_slug'] = 'path/to/editor/plugin.js';\n\treturn $plugins;\n}\n\nadd_filter( 'mce_buttons', 'plugin_slug_register_button' );\nfunction plugin_slug_register_button( $buttons ) {\n\tarray_push( $buttons, 'plugin_slug' );\n\treturn $buttons;\n}"
    language: php
---

