const proxyService = require('../services/proxyService');

verifyToken = async (req, res, next) => {

	if (req.headers.authorization) {

		let token = req.headers.authorization;
		let size = +req.headers['content-length']
		let valid = await proxyService.tokenIsValid(token);

		await proxyService.logRequest(token, size, valid ? 'accepted' : 'rejected');

		if (valid) {
			next();
		}
		else {
			res.sendStatus(403);
		}
		
	} else {
		res.sendStatus(403);
	}
}

const proxyAuthentication = {
	verifyToken
};

module.exports = proxyAuthentication;