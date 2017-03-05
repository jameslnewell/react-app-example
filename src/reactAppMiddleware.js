import React from 'react';
import {renderToString} from 'react-dom/server';
import {StaticRouter} from 'react-router-dom';
import App from './components/App.js';

export default (req, res, next) => {

  const context = {};
  const html = renderToString(
    <StaticRouter location={req.url} context={context}>
      <App/>
    </StaticRouter>
  );

  if (context.url) {
    res.redirect(302, context.url);
  } else {
    res.send(`
      <body>
        Test
        <div id="app">${html}</div>
        <script src="client.js"></script>
      </body>
    `);
  }

};
