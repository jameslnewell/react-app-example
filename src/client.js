import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import runtime from 'serviceworker-webpack-plugin/lib/runtime'; //eslint-disable-line
import store from './store';
import App from './components/App';

if ('serviceWorker' in navigator) {
  runtime.register();
}

const render = Root => {
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter basename={process.env.BASE_URL}>
        <Root/>
      </BrowserRouter>
    </Provider>,
    document.getElementById('app')
  );
};

render(App);

if (module.hot) {
  module.hot.accept('./components/App', () => {
    render(require('./components/App').default); //eslint-disable-line global-require
  });
}
