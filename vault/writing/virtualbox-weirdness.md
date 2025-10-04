---
tags:
  - web
  - essay
title: VirtualBox Weirdness
description: I’m getting close to sharing version 0.0.1 of WP-Gitdown, a feature-incomplete version of the project. I’m going to just get something up ASAP because I’m still learning PHP (and AJAX, apparently) and would love feedback on things I’m doing right or wrong. However, I did want to share one oddity I’ve already run into using \[…]
slug: writing/virtualbox-weirdness
published_at: 2014-02-10T17:06:03.000Z
updated_at: 2022-12-04T23:37:48.000Z
excerpt: I’m getting close to sharing version 0.0.1 of WP-Gitdown, a feature-incomplete version of the project. I’m going to just get something up ASAP because I’m still learning PHP (and AJAX, apparently) and would love feedback on things I’m doing right or wrong. However, I did want to share one oddity I’ve already run into using \[…]
featuredMedia: "[Vagrant logo](/vault/_data/vagrant-logo.md)"
share: true
---

I'm getting close to sharing version 0.0.1 of WP-Gitdown, a feature-incomplete version of the project. I'm going to just get something up ASAP because I'm still learning PHP (and AJAX, apparently) and would love feedback on things I'm doing right or wrong. However, I did want to share one oddity I've already run into using Vagrant.

One of the steps the plugin takes upon activation is creating the git repo we're going to store all our posts in. In testing, I delete the git repo from the _host_ side (in my case, OS X), and deactivate/reactivate the plugin to test if the folder gets recreated. And unfortunately, it wasn't.

I actually thought it was an error in the WordPress function, [`wp_mkdir_p`](http://codex.wordpress.org/Function_Reference/wp_mkdir_p), which was basically "seeing" the folder as created, but returning `false` for `is_dir` ([line 1362](https://core.trac.wordpress.org/browser/tags/3.8.1/src/wp-includes/functions.php#L0)). Which was really weird. I actually opened a question in Stackexchange's WordPress community before eventually tracking it down to a [VirtualBox bug](https://www.virtualbox.org/ticket/9197), which apparently only affects guests with a Linux kernel. I was using VagrantPress as my base to run from, so Ubuntu had the problem.

A quick `vagrant reload` solves the problem.
