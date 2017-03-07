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
      <BrowserRouter>
        <Root/>
      </BrowserRouter>
    </Provider>,
    document.getElementById('app')
  );
};

render(App);

if (module.hot) {
  module.hot.accept('./components/App', () => {
    import('./components/App').then(module => render(module.default))
  });
}
