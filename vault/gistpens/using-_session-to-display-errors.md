---
tags:
  - web
  - snippet
title: Using $_SESSION to Display Errors
description: ""
slug: gistpens/using-_session-to-display-errors
published_at: 2015-11-18T21:45:10.000Z
updated_at: 2015-11-18T21:45:10.000Z
share: true
---

```php title="start-session.php"
if ( !session_id() ) {
    session_start();
}
```

^start-session-php

```php title="save-errors-session.php"
if ($error) {
    $_SESSION['my_plugin_errors'] = $error->get_error_message();
}
```

^save-errors-session-php

```php title="display-session-errors.php"
if ( array_key_exists( 'my_plugin_errors', $_SESSION ) ) {?>
    <div class="error">
        <p><?php echo $_SESSION['my_plugin_errors']; ?></p>
    </div><?php

    unset( $_SESSION['my_plugin_errors'] );
}
```

^display-session-errors-php
