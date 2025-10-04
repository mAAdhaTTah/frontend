---
tags:
  - web
  - snippet
title: Using Transients to Display Errors
description: ""
slug: gistpens/using-transients-to-display-errors
published_at: 2015-11-18T21:13:26.000Z
updated_at: 2015-11-18T21:13:26.000Z
share: true
---

```php title="save-transient.php"
if ($error) {
    set_transient("my_save_post_errors_{$post_id}_{$user_id}", $error, 45);
}
```

^save-transient-php

```php title="display-transient-errors.php"
if ( $error = get_transient( "my_save_post_errors_{$post_id}_{$user_id}" ) ) { ?>
    <div class="error">
        <p><?php echo $error->get_error_message(); ?></p>
    </div><?php

    delete_transient("my_save_post_errors_{$post_id}_{$user_id}");
}
```

^display-transient-errors-php
