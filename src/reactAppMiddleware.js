import path from 'path';
import React from 'react';
import {renderToString} from 'react-dom/server';
import {StaticRouter} from 'react-router-dom';
import {ServerStyleSheet} from 'styled-components';
import revManifestPath from 'rev-manifest-path';
import App from './components/App.js';

const assetPath = revManifestPath({
  manifest: path.join(__dirname, 'rev-manifest.json')
});

export default (req, res) => {

  const context = {};
  const sheet = new ServerStyleSheet();
  const html = renderToString(sheet.collectStyles(
    <StaticRouter location={req.url} context={context}>
      <App/>
    </StaticRouter>
  )); 
  const css = sheet.getStyleElement();

  if (context.url) {
    res.redirect(302, context.url);
  } else {
    // ${scripts.map(script => `<link rel="preload" href="${script}" as="script"/>`).join('\n')}
    res.send(`
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <style>
          ${css}
        </style>
        <link href="${assetPath('client.css')}" rel="stylesheet"/>
      </head>
      <body>
        <div id="app">${html}</div>
        <script src="${assetPath('vendor.js')}" defer></script>
        <script src="${assetPath('client.js')}" defer></script>
      </body>
    `);
  }

};
