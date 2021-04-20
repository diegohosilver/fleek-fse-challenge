const db = require("../models");
const Key = db.key;

exports.listKeys = (req, res) => {

	try {

		Key.find({
			deleted: false
		})
		.exec((err, keys) => {

			if (err) {

				throw err;
			}

			res.send(keys.map(({ id, enabled }) => ({id, enabled})));
		})
	}
	catch(err) {
		console.log(err);

		res.status(400).send({ message: 'An error ocurred while trying to list keys' });
	}
}

exports.addKey = (req, res) => {

	try {

		let body = req.body;

		let key = new Key({
			id: body.id,
			enabled: body.enabled,
			deleted: false
		});
		
		key.save(err => {

			if (err) {

				throw err; 
			}

			res.send({id: key.id, enabled: key.enabled});
		});
	}
	catch(err) {
		console.log(err);

		res.status(400).send({ message: 'An error ocurred while trying to save your key' });
	}
}

exports.bulkUpdateKeys = (req, res) => {
    
	try {

		let items = req.body.items;
		let enabled = req.body.enabled;

		let ids = items.map(x => x.id);

		Key.find(
			{ id: { $in: ids } },
		)
		.updateMany(
			{ $set: { enabled: enabled } }
		)
		.exec((err) => { 

			if (err) {

				throw err; 
			}

			res.send({items: items.map(({id}) => ({id, enabled}))})
		});
	}
	catch(err) {
		console.log(err);

		res.status(400).send({ message: 'An error ocurred while trying to update your keys' });
	}
}

exports.bulkDeleteKeys = (req, res) => {
    
	try {

		let items = req.body.items;

		let ids = items.map(x => x.id);

		Key.find(
			{ id: { $in: ids } },
		)
		.updateMany(
			{ $set: { deleted: true } }
		)
		.exec((err) => { 

			if (err) {

				throw err; 
			}

			res.send({deleted: ids.length})
		});
	}
	catch(err) {
		console.log(err);

		res.status(400).send({ message: 'An error ocurred while trying to delete your keys' });
	}
}