---
description: Vagrant WordPress Post-up for WP-Gistpen
status: publish
gistId: none
sync: true
createdAt: '2015-02-14T18:36:38.000Z'
updatedAt: '2015-02-14T18:36:38.000Z'
blobs:
  - filename: vg-wp-post-up.sh
    code: |-
      sudo apt-get -y install subversion phpunit
      cd /srv/www/jamesdigioia.com/current
      cd $(wp plugin path --dir wp-gistpen)
      bash test/install-wp-tests.sh wordpress_test root devpw localhost latest
    language: bash
---

