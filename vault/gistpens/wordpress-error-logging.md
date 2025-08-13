---
tags:
  - web
  - snippet
title: WordPress Error Logging
description: ""
slug: gistpens/wordpress-error-logging
published_at: 2015-02-14T18:33:52.000Z
updated_at: 2015-02-14T18:33:52.000Z
share: true
---

```php title="write-log.php"
if (!function_exists('write_log')) {
    function write_log ( $log )  {
        if ( true === WP_DEBUG ) {
            if ( is_array( $log ) || is_object( $log ) ) {
                error_log( print_r( $log, true ) );
            } else {
                error_log( $log );
            }
        }
    }
}
```

^write-log-php
