---
tags:
  - web
  - snippet
title: Chatr Boilerplate
description: ""
slug: gistpens/chatr-boilerplate
published_at: 2016-03-28T21:36:22.000Z
updated_at: 2016-03-28T21:36:22.000Z
share: true
---

```js title=".babelrc"
{"presets":["es2015","react"]}
```

^-babelrc

```js title="server.js"
import express from "express";

const app = express();

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.set("Content-Type", "text/html");
  res.send("<h1>Hello World!</h1>");
});

app.listen(3000);
```

^server-js

```js title="webpack.config.js"
const webpack = require("webpack");

module.exports = {
  entry: ["./client.js"],
  devtool: "sourcemap",
  debug: true,
  output: {
    path: "public/",
    filename: "[name].min.js",
    sourceMapFilename: "[name].js.map",
  },
  module: {
    loaders: [
      {
        test: /.js$/,
        loader: "babel",
        exclude: /(node_modules)/,
      },
    ],
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({ minimize: true }),
  ],
};
```

^webpack-config-js

```js title="client.js"
const add = (a, b) => a + b;

console.log(add(1, 2));
```

^client-js

```sass title="styles.scss"
@import "node_modules/bourbon/core/bourbon";
@import "node_modules/bourbon-neat/app/assets/stylesheets/neat";

@import "base/base";
```

^styles-scss

```js title="handlebars"
app.engine("hbs", exphbs({ extname: ".hbs" }));
app.set("view engine", "hbs");

app.get("/", (req, res) => {
  res.render("index", {
    app: "<h1>Hello World!</h1>",
    state: "{}",
  });
});
```

^handlebars

```handlebars title="main.hbs"
<html>
  <head>
    <meta charset="utf-8" />
    <title>Web Chat</title>
    <link href="/styles.css" rel="stylesheet" title="Default Styles" />
  </head>
  <body>

    <div id="app">{{{app}}}</div>

    <script type="text/javascript">
      window.__INITIAL_STATE__ =
      {{{state}}}
    </script>
    <script src="/client.js" charset="utf-8"></script>

  </body>
</html>
```

^main-hbs
