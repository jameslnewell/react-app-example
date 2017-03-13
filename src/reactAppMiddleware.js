import fs from 'fs';
import React from 'react';
import {renderToString} from 'react-dom/server';
import {StaticRouter} from 'react-router-dom';
import {styleSheet} from 'styled-components';
import App from './components/App.js';

export default (req, res) => {

  let scripts = [];
  try {
    scripts = JSON.parse(fs.readFileSync(`${__dirname}/asset-manifest.json`).toString());
  } catch (e) {
    console.log(e.message);
  }
  console.log(scripts);

  // styleSheet.reset();
  const context = {};
  const html = renderToString(
    <StaticRouter location={req.url} context={context}>
      <App/>
    </StaticRouter>
  );
  const css = styleSheet.getCSS();

  if (context.url) {
    res.redirect(302, context.url);
  } else {
    //TODO: figure out fingerprinted client.js name
    res.send(`
      <head>
        ${scripts.map(script => `<link rel="preload" href="${script}" as="script"/>`).join('\n')}
        <style>
          ${css}
        </style>
      </head>
      <body>
        <div id="app">${html}</div>
        <script src="vendor.js" defer></script>
        <script src="client.js" defer></script>
      </body>
    `);
  }

};
