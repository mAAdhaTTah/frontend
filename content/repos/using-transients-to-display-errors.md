---
description: Using Transients to Display Errors
status: publish
gistId: none
sync: false
createdAt: '2015-11-18T21:13:26.000Z'
updatedAt: '2015-11-18T21:13:26.000Z'
blobs:
  - filename: save-transient.php
    code: "if ($error) {\n\_ \_ set_transient(\"my_save_post_errors_{$post_id}_{$user_id}\", $error, 45);\n}"
    language: php
  - filename: display-transient-errors.php
    code: "if ( $error = get_transient( \"my_save_post_errors_{$post_id}_{$user_id}\" ) ) { ?>\n\_ \_ <div class=\"error\">\n\_ \_ \_ \_ <p><?php echo $error->get_error_message(); ?></p>\n\_ \_ </div><?php\n\n\_ \_ delete_transient(\"my_save_post_errors_{$post_id}_{$user_id}\");\n}"
    language: php
---

