const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

let bcrypt = require("bcryptjs");

const dbConfig = require('../config/db.config');
const User = require("./user.model");

const db = {};

db.mongoose = mongoose;
db.user = User;

db.setDefaultData = function() {
    User.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            new User({
                name: "Key Creator",
                email: "key-creator@fleek-challenge.com",
                password: bcrypt.hashSync("9r@QS!2u", 8)
            }).save(err => {
                if (err) {
                    console.log("Error when creating user", err)
                }

                console.log("added document to user collection")
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
        db.setDefaultData();
    })
    .catch(err => {
        console.error("Connection error", err);
        process.exit();
    });
}

module.exports = db;