---
description: save_post Error Reporting Boilerplate
status: publish
gistId: fe2c64f2acfe33b28ef9
sync: false
createdAt: '2015-11-19T20:50:41.000Z'
updatedAt: '2015-11-19T20:50:41.000Z'
blobs:
  - filename: admin-notice-hook.php
    code: 'add_action( ''admin_notices'', ''my_error_message'' );'
    language: php
  - filename: save-post-hook.php
    code: "add_action( 'save_post', 'my_save_post_function' );\nfunction my_save_function( $post_id ) {\n\_ \_ $error = false;\n\n\_ \_ // Do stuff.\n\n\_ \_ if ($something_went_wrong) {\n\_ \_ \_ \_ $error = new WP_Error($code, $msg);        \n\_ \_ }\n\n\_ \_ if ($error) {\n\_ \_ \_ \_ // Handle error.\n\_ \_ }\n\n\_ \_ return true;\n}"
    language: php
---

