---
description: Using Redirect Args to Display Errors
status: publish
gistId: 1599752d5a01392d0c11
sync: false
createdAt: '2015-11-18T21:26:13.000Z'
updatedAt: '2015-11-18T21:26:13.000Z'
blobs:
  - filename: add-redirect-args.php
    code: "if ($error) {\n\_ \_ add_filter('redirect_post_location', function( $location ) use ( $error ) {\n\_ \_ \_ \_ return add_query_arg( 'my-plugin-error', $error->get_error_code(), $location );\n\_ \_ });\n}"
    language: php
  - filename: display-get-errors.php
    code: "if ( array_key_exists( 'my-plugin-error', $_GET) ) { ?>\n\_ \_ <div class=\"error\">\n\_ \_ \_ \_ <p>\n\_ \_ \_ \_ \_ \_ <?php\n    \_ \_ \_ \_ \_ \_ switch($_GET['my-plugin-error']) {\n    \_ \_ \_ \_ \_ \_ \_ \_ case 'an_error_code':\n    \_ \_ \_ \_ \_ \_ \_ \_ \_ \_ echo 'The post failed to save because problems.';\n    \_ \_ \_ \_ \_ \_ \_ \_ \_ \_ break;\n    \_ \_ \_ \_ \_ \_ \_ \_ case 'another_error_code':\n    \_ \_ \_ \_ \_ \_ \_ \_ \_ \_ echo 'The post failed to save because reasons.';\n    \_ \_ \_ \_ \_ \_ \_ \_ \_ \_ break;\n    \_ \_ \_ \_ \_ \_ \_ \_ default:\n    \_ \_ \_ \_ \_ \_ \_ \_ \_ \_ echo 'An error ocurred when saving the post.';\n    \_ \_ \_ \_ \_ \_ \_ \_ \_ \_ break;\n    \_ \_ \_ \_ \_ \_ }\n\_ \_ \_ \_ \_ \_ ?>\n\_ \_ \_ \_ </p>\n\_ \_ </div><?php\n}"
    language: php
---

