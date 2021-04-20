const { createProxyMiddleware } = require('http-proxy-middleware');
const proxyService = require('../services/proxyService');
const proxyConfig = require('../config/proxy.config');

module.exports = function(app) {

	app.use('', async (req, res, next) => {
		if (req.headers.authorization) {

			let valid = await proxyService.tokenIsValid(req.headers.authorization);

			if (valid) {
				next();
			}
			else {
				res.sendStatus(403);
			}
			
		} else {
			res.sendStatus(403);
		}
	});

	app.use('/proxy', createProxyMiddleware({
		target: proxyConfig.IPFS_API_URL,
		changeOrigin: false,
		pathRewrite: {
			[`^/proxy`]: '',
		},
	 }));
}