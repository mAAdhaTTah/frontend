---
description: WordPress Site Boilerplate
status: publish
gistId: none
sync: true
createdAt: '2015-03-07T20:36:07.000Z'
updatedAt: '2015-03-07T20:36:07.000Z'
blobs:
  - filename: composer.json
    code: >-
      {
        "name": "name/site",
        "type": "project",
        "license": "MIT",
        "description": "A modern WordPress stack for Name.com",
        "homepage": "http://name.com/",
        "authors": [
          {
            "name": "James DiGioia",
            "email": "jamesorodig@gmail.com",
            "homepage": "https://jamesdigioia.com/"
          }
        ],
        "repositories": [{ "type": "composer", "url": "http://wpackagist.org" }],
        "require": {
          "php": ">=5.4",
          "johnpbloch/wordpress": "4.1.1",
          "wpackagist-theme/casper": "1.1.0",
          "wpackagist-plugin/akismet": "3.0.3",
          "wpackagist-plugin/batcache": "1.2",
          "wpackagist-plugin/backwpup": "3.1.2",
          "wpackagist-plugin/limit-login-attempts": "1.7.1",
          "wpackagist-plugin/media-file-renamer": "1.9.4",
          "wpackagist-plugin/post-thumbnail-editor": "2.4.2",
          "wpackagist-plugin/wordpress-seo": "1.6.3",
          "wpackagist-plugin/wp-smushit": "1.6.5.4",
          "composer/installers": "v1.0.12",
          "vlucas/phpdotenv": "~1.0.6",
          "wp-sync-db/wp-sync-db": "dev-master#c0475de77ca28891a35726eee7d30f9c0d804ba0",
          "wp-sync-db/wp-sync-db-media-files": "dev-master#f49c90ff8716b80bfbcc650212fd3f583d06f234",
          "wp-sync-db/wp-sync-db-cli": "dev-master#28188ea6c4081e5bd322e9c14bbfc4946d5dcb73"
        },
        "require-dev": {
          "wpackagist-plugin/debug-bar": "0.8.2",
          "wpackagist-plugin/debug-bar-console": "0.3",
          "wpackagist-plugin/debug-bar-cron": "0.1.2",
          "wpackagist-plugin/debug-bar-extender": "0.5",
          "wpackagist-plugin/log-deprecated-notices": "0.3",
          "wpackagist-plugin/rewrite-rules-inspector": "1.2.1"
        },
        "extra": {
          "installer-paths": {
            "web/app/mu-plugins/{$name}/": ["type:wordpress-muplugin"],
            "web/app/plugins/{$name}/": ["type:wordpress-plugin"],
            "web/app/themes/{$name}/": ["type:wordpress-theme"]
          },
          "wordpress-install-dir": "web/wp"
        }
      }

    language: js
---

