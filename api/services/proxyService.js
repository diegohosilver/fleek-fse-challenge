const db = require('../models');
const Key = db.key;

const proxyService = {};

proxyService.tokenIsValid = async (token) => {

	let valid = false

	try {

		let key = await Key.findOne({ id: token }).exec();

		valid = !key.deleted && key.enabled;
	}
	catch(err){

		console.log(err);
	}

	return valid;
}

module.exports = proxyService;