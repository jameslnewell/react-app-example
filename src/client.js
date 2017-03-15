import 'babel-polyfill';
import rechannel from 'rechannel'; //eslint-disable-line
import reducer from './reducer';
import App from './components/App';
import './client.css';

const renderer = rechannel({
  component,
  reducer,
  routerProps: {basename: process.env.BASE_URL}
});

renderer.render(App);

if (module.hot) {

  module.hot.accept('./components/App', () => {
    renderer.replaceComponent(require('./components/App').default); //eslint-disable-line global-require
  });

  module.hot.accept('./reducer', () => {
    renderer.replaceReducer(require('./reducer').default); //eslint-disable-line global-require
  });

}
