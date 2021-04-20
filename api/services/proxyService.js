const db = require('../models');
const Key = db.key;
const Request = db.request;

const proxyService = {};

proxyService.tokenIsValid = async (token) => {

	let valid = false

	try {

		let key = await Key.findOne({ id: token }).exec();

		if (key != null)

			valid = !key.deleted && key.enabled;
	}
	catch(err){

		console.log(err);
	}

	return valid;
}

proxyService.logRequest = async (key, size, status) => {

	try {

		let date = new Date();

		let request = new Request({
			key,
			size,
			date,
			status
		})

		await request.save();
	}
	catch(err) {

		console.log(err);
	}
}

module.exports = proxyService;