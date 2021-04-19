const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var bcrypt = require("bcryptjs");

const User = require("./user.model");

const db = {};

db.mongoose = mongoose;
db.user = User;

db.setDefaultData = function() {
    User.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            new User({
                username: "Key creator",
                email: "key-creator@fleek-challenge.com",
                password: bcrypt.hashSync("9r@QS!2u", 8)
            })
        }
    });
}

db.initialize = function() {
    db.mongoose
    .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Successfully connect to MongoDB.");
        initial();
    })
    .catch(err => {
        console.error("Connection error", err);
        process.exit();
    });
}

module.exports = db;