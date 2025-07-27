---
tags:
  - web
  - snippet
title: Vagrant WordPress Post-up for WP-Gistpen
description: ""
slug: gistpens/vagrant-wordpress-post-up-for-wp-gistpen
published_at: 2015-02-14T18:36:38.000Z
updated_at: 2015-02-14T18:36:38.000Z
share: true
---

```bash title="vg-wp-post-up.sh"
sudo apt-get -y install subversion phpunit
cd /srv/www/jamesdigioia.com/current
cd $(wp plugin path --dir wp-gistpen)
bash test/install-wp-tests.sh wordpress_test root devpw localhost latest
```

^vg-wp-post-up-sh
