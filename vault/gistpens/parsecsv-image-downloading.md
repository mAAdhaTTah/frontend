---
tags:
  - web
  - snippet
title: ParseCSV Image Downloading
description: ""
slug: gistpens/parsecsv-image-downloading
published_at: 2015-02-14T18:37:20.000Z
updated_at: 2015-02-14T18:37:20.000Z
share: true
---

```php title="parsecsv-image-downloading.php"
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
```

^parsecsv-image-downloading-php
