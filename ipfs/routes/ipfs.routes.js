const controller = require("../controllers/ipfs.controller");

module.exports = function(app) {

	app.post("/upload", controller.upload);
}