import express from 'express';
import reactAppMiddleware from './reactAppMiddleware';
const app = express();

const replacableMiddleware = initialMiddleware => {

	if (typeof initialMiddleware !== 'function') {
		throw new Error('`replacableMiddleware(initialMiddleware)`: `initialMiddleware` must be a middleware function.');
	}

	let currentMiddleware = initialMiddleware;

	const middleware = (...args) => {
		currentMiddleware(...args);
	};

	middleware.replace = nextMiddleware => {

		if (typeof nextMiddleware !== 'function') {
			throw new Error('`replacableMiddleware.replace(nextMiddleware)`: `nextMiddleware` must be a middleware function.');
		}

		currentMiddleware = nextMiddleware;
	};

	return middleware;
};

const replaceMiddleware = replacableMiddleware(reactAppMiddleware);

app
	.use(replaceMiddleware)
	.listen(4000)
;

if(module.hot) {
	module.hot.accept('./reactAppMiddleware', () => {
		import('./reactAppMiddleware').then(module => replaceMiddleware.replace(module.default));
	});
}
