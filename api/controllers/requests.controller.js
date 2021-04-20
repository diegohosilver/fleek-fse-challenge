const db = require("../models");
const Request = db.request;

exports.listRequests = (req, res) => { 

	// this will get the last 50 requests
	try {
		
		Request.find().sort({ date: 1 }).limit(50).exec((err, requests) => {

			if (err) {

				throw err;
			}

			res.send(requests.map(({id, key, size, date, status}) => ({id, key, size, date, status})))
		});
	}
	catch(err) {
		console.log(err)

		res.status(400).send({ message: 'An error ocurred while trying to list keys' });
	}
}