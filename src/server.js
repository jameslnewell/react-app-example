import express from 'express';
import removableMiddleware from 'removable-middleware';
import reactAppMiddleware from './reactAppMiddleware';

const app = express();
const middleware = removableMiddleware(reactAppMiddleware);

app
  .use(express.static(__dirname))
	.use(middleware)
	.listen(4000)
;

if(module.hot) {
	module.hot.accept('./reactAppMiddleware', () => {
		import('./reactAppMiddleware').then(module => middleware.replace(module.default));
	});
}
