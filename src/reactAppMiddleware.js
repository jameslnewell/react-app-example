import path from 'path';
import React from 'react';
import {renderToString} from 'react-dom/server';
import {StaticRouter} from 'react-router-dom';
import {styleSheet} from 'styled-components';
import revManifestPath from 'rev-manifest-path';
import App from './components/App.js';

const assetPath = revManifestPath({
  manifest: path.join(__dirname, 'rev-manifest.json')
});

export default (req, res) => {

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
    //no 404??!
    res.send(`
      <head>
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
