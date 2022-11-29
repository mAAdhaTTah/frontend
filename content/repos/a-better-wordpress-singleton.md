---
description: A Better WordPress Singleton
status: publish
gistId: 578b34c9262019d17c7f
sync: true
createdAt: '2015-11-14T14:51:44.000Z'
updatedAt: '2015-11-14T14:51:44.000Z'
blobs:
  - filename: normal-singleton-and-boot.php
    code: |-
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
    language: php
  - filename: improved-singleton.php
    code: |-
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
    language: php
  - filename: improved-boot.php
    code: 'call_user_func(array(new PluginClass(__FILE__), ''boot''));'
    language: php
---

