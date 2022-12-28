---
description: PHP Version check for WP Boilerplate
status: publish
gistId: none
sync: true
createdAt: '2015-02-14T18:35:32.000Z'
updatedAt: '2015-02-14T18:35:32.000Z'
blobs:
  - filename: 5-3-or-greater.php
    code: "public static function activate() {\n\tif ( ! version_compare( PHP_VERSION, '5.3', '<' ) ) {\n\t\treturn;\n\t}\n\n\tdeactivate_plugins( 'url-embedlifier' );\n\twp_die('<p>The <strong>URL Embedlifier</strong> plugin requires PHP version 5.3 or greater.</p>',\n\t\t'Plugin Activation Error',  array( 'response' => 200, 'back_link' => true ) );\n}"
    language: php
---

