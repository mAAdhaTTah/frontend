---
description: Server-Side Rendering with React
status: publish
gistId: ''
sync: false
createdAt: '2016-04-05T22:17:58.000Z'
updatedAt: '2016-04-05T22:17:58.000Z'
blobs:
  - filename: app.js
    code: |-
      import React from 'react';

      const App = React.createClass({
          displayName: 'App',

          propTypes: {
              headline: React.PropTypes.string.isRequired
          },

          render: function render() {
              return (
                  <h1 className="headline">
                      {this.props.headline}
                  </h1>
              );
          }
      });

      export default App;
    language: js
  - filename: rendered.html
    code: |-
      <h1 class="headline">
          Hello World!
      </h1>
    language: html
  - filename: server.js
    code: |-
      import express from 'express';
      import exphbs from 'express-handlebars';
      import React from 'react';
      import ReactDOMServer from 'react-dom/server';

      const app = express();

      app.engine('hbs', exphbs({extname: '.hbs'}));
      app.set('view engine', 'hbs');

      app.use(express.static('public'));

      app.get('/', (req, res) => {
          const state = { headline: 'Hello World!' };

          res.render('index', {
              app: ReactDOMServer.renderToString(<App {...state} />),
              state: JSON.stringify(state)
          });
      });
    language: js
  - filename: client.js
    code: |-
      import ReactDOM from 'react-dom';

      const state = window.__INITIAL_STATE__ || {};

      document.addEventListener('DOMContentLoaded', () => {
          ReactDOM.render(
              <App {...state} />,
              document.getElementById('app')
          );
      });
    language: js
---
