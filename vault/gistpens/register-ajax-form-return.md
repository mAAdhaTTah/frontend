---
tags:
  - web
  - snippet
title: Register Ajax Form Return
description: ""
slug: gistpens/register-ajax-form-return
published_at: 2015-02-14T18:37:01.000Z
updated_at: 2015-02-14T18:37:01.000Z
share: true
---

```php title="register-ajax.php"
add_action( 'wp_ajax_plugin_slug_insert_dialog', 'plugin_slug_insert_gistpen_dialog' );

function plugin_slug_insert_gistpen_dialog() {
    die(include 'path/to/dialog/form.php');
}
```

^register-ajax-php
