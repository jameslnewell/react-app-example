import 'source-map-support/register';
import express from 'express';
import rechannel from 'rechannel';
import App from './components/App';

const app = express();
const middleware = rechannel({
  component,
  reducer
});

app
  .use(express.static(__dirname))
	.use(middleware)
	.listen(process.env.PORT || 3000)
;

if (module.hot) {

	module.hot.accept('./components/App', () => {
    middleware.replaceComponent(require('./components/App').default); //eslint-disable-line global-require
	});

  module.hot.accept('./reducer', () => {
    middleware.replaceReducer(require('./reducer').default); //eslint-disable-line global-require
  });

}
