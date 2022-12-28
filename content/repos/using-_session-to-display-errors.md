---
description: Using $_SESSION to Display Errors
status: publish
gistId: none
sync: false
createdAt: '2015-11-18T21:45:10.000Z'
updatedAt: '2015-11-18T21:45:10.000Z'
blobs:
  - filename: start-session.php
    code: "if ( !session_id() ) {\n\_ \_ session_start();\n}"
    language: php
  - filename: save-errors-session.php
    code: "if ($error) {\n\_ \_ $_SESSION['my_plugin_errors'] = $error->get_error_message();\n}"
    language: php
  - filename: display-session-errors.php
    code: "if ( array_key_exists( 'my_plugin_errors', $_SESSION ) ) {?>\n\_ \_ <div class=\"error\">\n\_ \_ \_ \_ <p><?php echo $_SESSION['my_plugin_errors']; ?></p>\n\_ \_ </div><?php\n\n\_ \_ unset( $_SESSION['my_plugin_errors'] );\n}"
    language: php
---

