---
description: WordPress Error Logging
status: publish
gistId: none
sync: true
createdAt: '2015-02-14T18:33:52.000Z'
updatedAt: '2015-02-14T18:33:52.000Z'
blobs:
  - filename: write-log.php
    code: |-
      if (!function_exists('write_log')) {
          function write_log ( $log )  {
              if ( true === WP_DEBUG ) {
                  if ( is_array( $log ) || is_object( $log ) ) {
                      error_log( print_r( $log, true ) );
                  } else {
                      error_log( $log );
                  }
              }
          }
      }
    language: php
---

