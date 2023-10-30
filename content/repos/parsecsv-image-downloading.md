---
description: ParseCSV Image Downloading
status: publish
gistId: none
sync: true
createdAt: '2015-02-14T18:37:20.000Z'
updatedAt: '2015-02-14T18:37:20.000Z'
blobs:
  - filename: parsecsv-image-downloading.php
    code: |-
      require("ParseCSV.php");

      $csv = new ParseCSV("youtube-images.csv");
      $n = 1;
      foreach($csv->data as $data) {
        if(false != file_put_contents("pics/{$data['filename']}.jpg", file_get_contents($data['url']))) {
          $log = "File {$n}: Downloaded {$data['filename']} from {$data['url']}\n";
        } else {
          $log = "File {$n}: Download from {$data['url']} failed\n";
        }
        print $log;
        file_put_contents("output.log", $log, FILE_APPEND | LOCK_EX);
        $n++;
      }
    language: php
---
