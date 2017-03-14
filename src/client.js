import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store';
import App from './components/App';
import './client.css';

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
