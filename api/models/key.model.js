const mongoose = require("mongoose");

const Key = mongoose.model(
  "Key",
  new mongoose.Schema({
    id: String,
    enabled: Boolean,
	deleted: Boolean
  })
);

module.exports = Key;