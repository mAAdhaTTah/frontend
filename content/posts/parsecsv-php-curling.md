---
title: ParseCSV and PHP Curling
publishedAt: '2014-04-29T16:24:32.000Z'
updatedAt: '2014-10-17T19:17:25.000Z'
menu: content/menus/main.md
header: content/headers/main.md
status: publish
body:
  - content: >
      One of the things that came out of the
      [BatchYouTubeUploader](https://jamesdigioia.com/new-project-batchyoutubeuploader/)
      was this nifty little object class,
      [ParseCSV](https://github.com/jimeh/php-parsecsv), which I use to
      manipulate the CSV file for uploading the videos. I know it's going to
      find a lot of use, and in this case, I wrote this little script to loop
      through a CSV and download a bunch of images. Just note you have to have
      `allow_url_fopen` set to `true`, as per this
      [StackExchange](http://stackoverflow.com/questions/724391/saving-image-from-php-url-using-php)
      post.


      \[gistpen id="2814"]
    _template: richText
excerpt: >
  One of the things that came out of the BatchYouTubeUploader was this nifty
  little object class, ParseCSV, which I use to manipulate the CSV file for
  uploading the videos. I know it’s going to find a lot of use, and in this
  case, I wrote this little script to loop through a CSV and download \[…]
featuredMedia: content/media/c94f4php-curl.md
categories:
  - reference: content/categories/technology.md
_template: standard
---


