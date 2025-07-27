---
tags:
  - web
  - snippet
title: Use WordPress-GitHub Sync with Markdown-on-Save
description: ""
slug: gistpens/use-wordpress-github-sync-with-markdown-on-save
published_at: 2015-08-31T10:52:32.000Z
updated_at: 2015-08-31T10:52:32.000Z
share: true
---

```php title="add-filter.php"
add_filter('wpghs_content_export', function($content, $wpghs_post) {
    return $wpghs_post->post->post_content_filtered;
});
```

^add-filter-php
