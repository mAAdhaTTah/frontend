---
title: 'Quick Update: WP-Gistpen Version 0.5.0'
publishedAt: '2014-12-21T17:22:24.000Z'
updatedAt: '2014-12-21T17:22:24.000Z'
menu: content/menus/main.md
header: content/headers/main.md
status: publish
body:
  - content: >
      I've been working hard on getting the next version of WP-Gistpen out the
      door. The "killer feature," Gist interoperability, is
      [underway](https://github.com/mAAdhaTTah/WP-Gistpen/pull/9). This a huuuge
      deal, which required a number of precursor features to be implemented, the
      biggest one (previously) being [revision
      saving](https://github.com/mAAdhaTTah/WP-Gistpen/pull/8).<FootnoteReference
      id="1" /> Unfortunately, as I started work on importing from Gist, I
      realized the current revision implementation wasn't going to work the way
      I want it to.


      Part of the difficulty is getting some visibility on what, exactly, is
      being saved and when. WordPress won't save a new revision unless the new
      version is different from the previous version. For WP-Gistpen, the main
      Post probably won't change all that often, because there isn't any content
      in it; all the content is saved in child posts, so the comparison filter
      would return false and not save a revision. I stuck in [a terrible
      solution](https://github.com/mAAdhaTTah/WP-Gistpen/blob/0d102e236771ae0dba5522068f16c2709b043722/wp-gistpen.php#L99),
      forcing the comparison to pass no matter what, but that also impacts
      regular posts as well.


      I've been watching with interest to development of WP-API, which is
      undergoing and major rewrite for [version
      2.0](https://github.com/WP-API/WP-API/milestones/2.0) and will *hopefully*
      land in core in 4.2 or 4.3, but [there isn't currently any
      timeline](https://github.com/WP-API/WP-API/issues/571#issuecomment-62153097)
      for integration. There has been discussion about the future of WordPress
      as an app framework/foundation, and the JSON API is a big step towards
      that future.


      My plan was to rewrite the editor front-end in Backbone in version 0.6.0,
      but WP-Gistpen's infrastructure makes it much easier to save this
      completely myself rather than hooking into WordPress's save process. This
      can be bypassed by sending the data to save via AJAX, rather than POST'ing
      the data to post.php<FootnoteReference id="2" /> and then redirecting
      after the save. Instead, I'm bumping the Backbone rewrite up to this
      version and rewriting the saving mechanism as an AJAX
      hook<FootnoteReference id="3" />, which will accomplish a couple things:


      1. It will give me a lot more control and visibility on exactly what is
      being saved when and how.

      2. The data can be sent as JSON, rather than the current hack-y `$_POST`
      variable set up.<FootnoteReference id="4" />

      3. The editor in general will function more like an app and will save and
      update "in-place," rather than WordPress's current "POST-and-redirect"
      method.


      That rewrite is currently in process
      [here](https://github.com/mAAdhaTTah/WP-Gistpen/pull/10). I'm doing all my
      development publicly like this going forward, in the hopes of getting
      feedback from other developers as I go. The [Gist interoperability
      PR](https://github.com/mAAdhaTTah/WP-Gistpen/pull/9) until the Backbone
      rewrite is merged into it.


      That's the current state of the project. There's a lot of work to be done
      to get this functioning the way I need to proceed with Gist syncing, but
      it'll be awesome when it's complete. The settings page in the Gist
      Interoperability PR above was written in Backbone and it works very well.
      I can't wait to unleash to this on the world.


      Lastly, I want to leave you with a pair of tutorials that were
      instrumental in getting the JS part working in WordPress:


      * [Using Backbone Within the WordPress Admin: The Front End from
      Tuts+](http://code.tutsplus.com/articles/using-backbone-within-the-wordpress-admin-the-front-end--wp-30121)
      -- this will will be more useful going forward

      * [Using Underscore.js Templates To Render HTML
      Partials](http://www.bennadel.com/blog/2411-using-underscore-js-templates-to-render-html-partials.htm)
      -- this was really helpful for the settings page.


      Stay tuned!


      <FootnoteDefinition id="1">
        I also added the beginning of some WP-CLI commands, including most importantly, the addition of test data so you don't need to be currently using the plugin to help work on it. Also, Scrutinizer, which has been incredibly helpful and is a feature that will be backported to [wppb-mod](https://jamesdigioia.com/new-project-wppb-mod/).
      </FootnoteDefinition>


      <FootnoteDefinition id="2">
        Which is what happens when you save it in the editor. It also manipulates the data a bit in a function called [`edit_post()`](https://core.trac.wordpress.org/browser/tags/4.1/src/wp-admin/includes/post.php#L179), then `wp_insert_post` does its own manipulation and validation. So it's a lot of steps and I'm not entirely clear what gets called when.
      </FootnoteDefinition>


      <FootnoteDefinition id="3">
        All the current AJAX hooks will be migrated over to WP-API hooks when that lands in core as well.
      </FootnoteDefinition>


      <FootnoteDefinition id="4">
        You can see that awfulness [here](https://github.com/mAAdhaTTah/WP-Gistpen/blob/04e94e03b2866508948dcaf3807de007bcf0edbb/admin/includes/class-wp-gistpen-saver.php#L35). While the current version looks a lot cleaner than this, as I've refactored and broken things down into chunks quite a bit, it doesn't function all that differently, and I've always hated it.
      </FootnoteDefinition>
    _template: richText
excerpt: >
  I’ve been working hard on getting the next version of WP-Gistpen out the door.
  The “killer feature,” Gist interoperability, is underway. This a huuuge deal,
  which required a number of precursor features to be implemented, the biggest
  one (previously) being revision saving.1 Unfortunately, as I started work on
  importing from Gist, I realized the current \[…]
featuredMedia: content/media/code-snippets.md
categories:
  - reference: content/categories/technology.md
_template: standard
---


