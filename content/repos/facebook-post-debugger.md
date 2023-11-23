---
description: Facebook Post Debugger
status: publish
gistId: ed7e1c5548be35e7b091
sync: true
createdAt: '2015-09-27T01:54:41.000Z'
updatedAt: '2015-09-27T01:54:41.000Z'
blobs:
  - filename: fb-debugger.php
    code: |-
      <?php
      /*
      Plugin Name: Facebook Post Debugger
      Version: 0.1
      Plugin URI: https://jamesdigioia.com/
      Description: This plugin runs the bit.ly shortlink through the Facebook
      debugger upon publishing.
      Author: James DiGioia
      Author URI: https://jamesdigioia.com/
      */

      add_filter( 'publish_post', 'fb_debug_link' );

      function fb_debug_link( $post ) {
        $short = wp_get_shortlink($post['id']);
        $url = 'https://graph.facebook.com/?id='.$short.'&scrape=true';
        wp_remote_post( $url );
      }
    language: php
---

