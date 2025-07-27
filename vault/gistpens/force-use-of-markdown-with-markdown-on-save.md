---
tags:
  - web
  - snippet
title: Force Use of Markdown with Markdown-on-Save
description: ""
slug: gistpens/force-use-of-markdown-with-markdown-on-save
published_at: 2015-11-14T16:45:22.000Z
updated_at: 2015-11-14T16:45:22.000Z
share: true
---

```php title="force-markdown.php"
add_filter('wpghs_pre_import_args', function ($args) {
  $args['force_markdown'] = true;

  return $args;
});
```

^force-markdown-php
