/* global require module process*/
const { createProxyMiddleware } = require('http-proxy-middleware');

// eslint-disable-next-line no-console
console.log('process.env.REACT_APP_SERVER_URL:', process.env.REACT_APP_SERVER_URL);

module.exports = function (app) {
	app.use(
		'/phones',
		createProxyMiddleware({
			target: `${process.env.REACT_APP_SERVER_URL || 'http://localhost:3001'}`,
			changeOrigin: true,
		}),
	);
	app.use(
		'/images',
		createProxyMiddleware({
			target: `${process.env.REACT_APP_SERVER_URL || 'http://localhost:3001'}`,
			changeOrigin: true,
		}),
	);
};
