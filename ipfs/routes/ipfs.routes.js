const ipfsService = require('../services/ipfsService');

module.exports = function(app) {

	app.post('/upload', async (req, res) => {
        try {
            const data = req.body
            const url = await ipfsService.upload(data)
            return res.send({ data: url });
        }
        catch (ex) {
			console.log(ex)

            return res.status(500).send(ex);
        }
    })
}