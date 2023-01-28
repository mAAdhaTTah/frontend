---
title: VirtualBox Weirdness
publishedAt: '2014-02-10T17:06:03.000Z'
updatedAt: '2022-12-04T23:37:48.000Z'
menu: content/menus/main.md
header: content/headers/main.md
status: publish
body:
  - content: >
      I'm getting close to sharing version 0.0.1 of WP-Gitdown, a
      feature-incomplete version of the project. I'm going to just get something
      up ASAP because I'm still learning PHP (and AJAX, apparently) and would
      love feedback on things I'm doing right or wrong. However, I did want to
      share one oddity I've already run into using Vagrant.


      One of the steps the plugin takes upon activation is creating the git repo
      we're going to store all our posts in. In testing, I delete the git repo
      from the *host* side (in my case, OS X), and deactivate/reactivate the
      plugin to test if the folder gets recreated. And unfortunately, it wasn't.


      I actually thought it was an error in the WordPress function,
      [`wp_mkdir_p`](http://codex.wordpress.org/Function_Reference/wp_mkdir_p),
      which was basically "seeing" the folder as created, but returning `false`
      for `is_dir` ([line
      1362](https://core.trac.wordpress.org/browser/tags/3.8.1/src/wp-includes/functions.php#L0)).
      Which was really weird. I actually opened a question in Stackexchange's
      WordPress community before eventually tracking it down to a [VirtualBox
      bug](https://www.virtualbox.org/ticket/9197), which apparently only
      affects guests with a Linux kernel. I was using VagrantPress as my base to
      run from, so Ubuntu had the problem.


      A quick `vagrant reload` solves the problem.
    _template: richText
excerpt: >
  I’m getting close to sharing version 0.0.1 of WP-Gitdown, a feature-incomplete
  version of the project. I’m going to just get something up ASAP because I’m
  still learning PHP (and AJAX, apparently) and would love feedback on things
  I’m doing right or wrong. However, I did want to share one oddity I’ve already
  run into using \[…]
featuredMedia: >-
  content/media/687474703a2f2f7777772e6861736869636f72702e636f6d2f696d616765732f626c6f672f612d6e65772d6c6f6f6b2d666f722d76616772616e742f6c6f676f5f776964652d63616234373038362e706e67.md
categories:
  - reference: content/categories/technology.md
_template: standard
---


