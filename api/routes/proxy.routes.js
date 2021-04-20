const { createProxyMiddleware } = require('http-proxy-middleware');
const { proxyAuth } = require("../middlewares");
const proxyConfig = require('../config/proxy.config');

module.exports = function(app) {

	app.use('/proxy', [proxyAuth.verifyToken], createProxyMiddleware({
		target: proxyConfig.IPFS_API_URL,
		changeOrigin: false,
		logLevel: 'debug',
		pathRewrite: {
			[`^/proxy`]: '',
		},
	 }));
}