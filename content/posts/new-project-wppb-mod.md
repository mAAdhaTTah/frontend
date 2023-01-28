---
title: 'New Project: wppb-mod'
publishedAt: '2014-10-19T23:30:13.000Z'
updatedAt: '2014-10-19T23:34:35.000Z'
menu: content/menus/main.md
header: content/headers/main.md
status: publish
body:
  - content: >
      If you're a WordPress developer working on your own plugins, you may have
      come across [Tom McFarlin's WordPress Plugin
      Boilerplate](https://github.com/tommcfarlin/WordPress-Plugin-Boilerplate).
      I used its previous iteration to start
      [WP-Gistpen](https://jamesdigioia.com/wp-gistpen/), and I've got another
      plugin or two in the works that's also based on it. The latest version was
      a major upgrade, with better organization and lot of excess code removed.
      I like it a lot, but as WP-Gistpen got more advanced, the
      public/admin/includes structure became too limiting. I rearranged the
      Boilerplate's folder structure, added my toolset, and registered the
      resulting package on
      [Packagist](https://packagist.org/packages/maadhattah/wppb-mod).


      Meet [wppb-mod](https://github.com/mAAdhaTTah/wppb-mod).


      My favorite part about this is you can run `composer create-project
      maadhaattah/wppb-mod <folder>` and you have a good structure to get
      started. This also means we can add a script that will find/replace the
      `Plugin Name` and related strings in the files as you run the composer
      command, something similar to
      [this](https://github.com/hasinhayder/plugin-boilerplate-code-generator/blob/master/index.php),
      making the whole process of starting a new plugin super simple.


      Check it out and let me know what you think!
    _template: richText
excerpt: >
  If you’re a WordPress developer working on your own plugins, you may have come
  across Tom McFarlin’s WordPress Plugin Boilerplate. I used its previous
  iteration to start WP-Gistpen, and I’ve got another plugin or two in the works
  that’s also based on it. The latest version was a major upgrade, with better
  organization and lot \[…]
featuredMedia: content/media/code-snippets.md
categories:
  - reference: content/categories/technology.md
_template: standard
---


