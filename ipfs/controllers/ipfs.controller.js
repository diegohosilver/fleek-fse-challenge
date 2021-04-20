exports.upload = async (req, res) => {

	try {

		let data = req.body;
		let url = await this.upload(data);
		res.send({ data: url }); 
	}
	catch(err) {
		console.log(err)

		res.status(500).send(err);
	}
}