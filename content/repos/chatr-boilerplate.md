---
description: Chatr Boilerplate
status: publish
gistId: ''
sync: false
createdAt: '2016-03-28T21:36:22.000Z'
updatedAt: '2016-03-28T21:36:22.000Z'
blobs:
  - filename: .babelrc
    code: '{"presets":["es2015","react"]}'
    language: js
  - filename: server.js
    code: |-
      import express from 'express';

      const app = express();

      app.use(express.static('public'));

      app.get('/', (req, res) => {
          res.set('Content-Type', 'text/html');
          res.send('<h1>Hello World!</h1>');
      });

      app.listen(3000);
    language: js
  - filename: webpack.config.js
    code: |-
      const webpack = require('webpack');

      module.exports = {
          entry: ['./client.js'],
          devtool: 'sourcemap',
          debug: true,
          output: {
              path: 'public/',
              filename: '[name].min.js',
              sourceMapFilename: '[name].js.map'
          },
          module: {
              loaders: [
                  {
                      test: /.js$/,
                      loader: 'babel',
                      exclude: /(node_modules)/,
                  }
              ]
          },
          plugins: [
              new webpack.optimize.DedupePlugin(),
              new webpack.optimize.UglifyJsPlugin({minimize: true})
          ]
      };
    language: js
  - filename: client.js
    code: |-
      const add = (a, b) => a + b;

      console.log(add(1,2));
    language: js
  - filename: styles.scss
    code: |-
      @import "node_modules/bourbon/core/bourbon";
      @import "node_modules/bourbon-neat/app/assets/stylesheets/neat";

      @import "base/base";
    language: sass
  - filename: handlebars
    code: |-
      app.engine('hbs', exphbs({extname: '.hbs'}));
      app.set('view engine', 'hbs');

      app.get('/', (req, res) => {
          res.render('index', {
            app: '<h1>Hello World!</h1>',
            state: '{}'
          })
      });
    language: js
  - filename: main.hbs
    code: |-
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Web Chat</title>
          <link href="/styles.css" rel="stylesheet" title="Default Styles">
        </head>
        <body>

          <div id="app">{{{app}}}</div>

          <script type="text/javascript">
            window.__INITIAL_STATE__ = {{{state}}}
          </script>
          <script src="/client.js" charset="utf-8"></script>

        </body>
      </html>
    language: handlebars
---

