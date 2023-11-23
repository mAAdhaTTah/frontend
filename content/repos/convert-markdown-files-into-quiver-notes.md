---
description: Convert Markdown Files into Quiver Notes
status: publish
gistId: ''
sync: false
createdAt: '2015-12-22T00:15:19.000Z'
updatedAt: '2015-12-22T00:15:19.000Z'
blobs:
  - filename: sort.js
    code: |-
      'use strict';

      const fs = require('fs');
      const Bluebird = require('bluebird');
      const path = require('path');
      const readDir = Bluebird.promisify(fs.readdir);
      const readFile = Bluebird.promisify(fs.readFile);
      const mkdir = Bluebird.promisify(fs.mkdir);
      const stat = Bluebird.promisify(fs.stat);
      const moment = require('moment');
      const writeFile = Bluebird.promisify(fs.writeFile);
      const rimraf = Bluebird.promisify(require('rimraf'));
      const uuid = require('node-uuid')

      readDir(process.cwd())
          .filter(filename => filename.indexOf('.md') !== -1)
          .map(generateQuiverNote);

      function generateQuiverNote(filename) {
          const filepath = path.join(process.cwd(), filename);
          const fileuuid = uuid.v4().toUpperCase();
          const dirpath = path.join(process.cwd(), fileuuid + '.qvnote');

          return createNoteDir()
              .then(() => Bluebird.join(createNoteMeta(), createNoteContent()));

          function createNoteDir() {
              return rimraf(dirpath).then(() => mkdir(dirpath));
          }

          function createNoteMeta() {
              return stat(filepath).then(function(stats, data) {
                  let meta = {};

                  meta.created_at = moment(stats.birthtime).unix();
                  meta.tags = [];
                  meta.title = filename.slice(0, -3);
                  meta.updated_at = moment(stats.mtime).unix();
                  meta.uuid = fileuuid;

                  return writeFile(path.join(dirpath, 'meta.json'), JSON.stringify(meta, null, 2));
              });
          }

          function createNoteContent() {
              return readFile(filepath).then(function(data) {
                  let content = {};

                  content.title = filename;
                  content.cells = [{
                      type: 'markdown',
                      data: data.toString()
                  }];

                  return writeFile(path.join(dirpath, 'content.json'), JSON.stringify(content, null, 2));
              });
          }
      }
    language: js
  - filename: package.json
    code: >-
      {
        "name": "markdown-to-quiver",
        "version": "1.0.0",
        "description": "Convert your markdown files into Quiver notes.",
        "main": "sort.js",
        "scripts": { "test": "echo \"Error: no test specified\" && exit 1" },
        "author": "James DiGioia <jamesorodig@gmail.com> (jamesdigioia.com)",
        "license": "ISC",
        "dependencies": {
          "bluebird": "^3.1.1",
          "moment": "^2.10.6",
          "node-uuid": "^1.4.7",
          "rimraf": "^2.4.4"
        }
      }

    language: js
---

