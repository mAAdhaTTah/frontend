---
tags:
  - web
  - snippet
title: A Better WordPress Singleton
description: ""
slug: gistpens/a-better-wordpress-singleton
published_at: 2015-11-14T14:51:44.000Z
updated_at: 2015-11-14T14:51:44.000Z
share: true
---

```php title="normal-singleton-and-boot.php"
class PluginClass
{
    public static $instance = null;

    public static function init()
    {
        if ( null === self::$instance ) {
            self::$instance = new PluginClass();
            self::$instance->boot();
        }

        return self::$instance;
    }

    protected function __construct()
    {
        // Startup
    }

    protected function boot()
    {
        // Boot
    }
}

PluginClass::init();
```

^normal-singleton-and-boot-php

```php title="improved-singleton.php"
class PluginClass
{
    protected static $instance = null;

    public function __construct($file)
    {
        if (static::$instance !== null) {
            throw new Exception;
        }

        static::$instance = $this;
    }

    public static function get()
    {
        return static::$instance;
    }
}
```

^improved-singleton-php

```php title="improved-boot.php"
call_user_func(array(new PluginClass(__FILE__), 'boot'));
```

^improved-boot-php
