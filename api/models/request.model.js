const mongoose = require("mongoose");

const Request = mongoose.model(
	"Request",
	new mongoose.Schema({
		key: String,
		size: Number,
		status: String,
		date: Date
	})
);

module.exports = Request;