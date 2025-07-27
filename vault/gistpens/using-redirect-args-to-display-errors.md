---
tags:
  - web
  - snippet
title: Using Redirect Args to Display Errors
description: ""
slug: gistpens/using-redirect-args-to-display-errors
published_at: 2015-11-18T21:26:13.000Z
updated_at: 2015-11-18T21:26:13.000Z
share: true
---

```php title="add-redirect-args.php"
if ($error) {
    add_filter('redirect_post_location', function( $location ) use ( $error ) {
        return add_query_arg( 'my-plugin-error', $error->get_error_code(), $location );
    });
}
```

^add-redirect-args-php

```php title="display-get-errors.php"
if ( array_key_exists( 'my-plugin-error', $_GET) ) { ?>
    <div class="error">
        <p>
            <?php
                switch($_GET['my-plugin-error']) {
                    case 'an_error_code':
                        echo 'The post failed to save because problems.';
                        break;
                    case 'another_error_code':
                        echo 'The post failed to save because reasons.';
                        break;
                    default:
                        echo 'An error ocurred when saving the post.';
                        break;
                }
            ?>
        </p>
    </div><?php
}
```

^display-get-errors-php
