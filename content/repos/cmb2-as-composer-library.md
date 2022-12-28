---
description: CMB2 as Composer Library
status: publish
gistId: none
sync: false
createdAt: '2015-11-17T12:36:53.000Z'
updatedAt: '2015-11-17T12:36:53.000Z'
blobs:
  - filename: composer.json
    code: |-
      {
       "require": {
          "php": ">=5.3.0",
          "composer/installers": "v1.0.12",
          "webdevstudios/cmb2": "dev-master",
        },
        "autoload": {
          "files": ["vendor/cmb2/init.php"]
        },
        "extra": {
          "installer-paths": {
            "vendor/{$name}/": ["webdevstudios/cmb2"]
          }
        } 
      }
    language: js
---

