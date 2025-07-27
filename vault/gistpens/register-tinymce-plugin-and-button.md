---
tags:
  - web
  - snippet
title: Register TinyMCE Plugin and Button
description: ""
slug: gistpens/register-tinymce-plugin-and-button
published_at: 2015-02-14T18:37:14.000Z
updated_at: 2015-02-14T18:37:14.000Z
share: true
---

```php title="register-tiny-mce-plugin.php"
add_filter( 'mce_external_plugins', 'plugin_slug_add_button' );
function plugin_slug_add_button( $plugins ) {
	$plugins['plugin_slug'] = 'path/to/editor/plugin.js';
	return $plugins;
}

add_filter( 'mce_buttons', 'plugin_slug_register_button' );
function plugin_slug_register_button( $buttons ) {
	array_push( $buttons, 'plugin_slug' );
	return $buttons;
}
```

^register-tiny-mce-plugin-php
