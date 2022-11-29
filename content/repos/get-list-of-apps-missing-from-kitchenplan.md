---
description: Get list of apps missing from Kitchenplan
status: publish
gistId: ''
sync: false
createdAt: '2015-10-31T14:38:57.000Z'
updatedAt: '2015-10-31T14:38:57.000Z'
blobs:
  - filename: new-cask.js
    code: |-
      var exec = require('child_process').exec;
      var grep = require('grep1');

      var callback = function(error, stdout, stderr) {
          if (error) {
              return console.error(error);
          }

          installed = stdout.split('\n');

          installed.forEach(function(app) {
              if (!app) {
                  return;
              }

              grep(['-nr', app, '/opt/kitchenplan'], function(err, stdout, stderr) {
                  if (err) {
                      console.log('* ' + app);
                  }
              });
          });
      };

      exec('brew list', callback);
      exec('brew cask list', callback);
    language: js
---

