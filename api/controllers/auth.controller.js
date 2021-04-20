const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;

let jwt = require("jsonwebtoken");
let bcrypt = require("bcryptjs");

exports.signin = (req, res) => {
    User.findOne({
        email: req.body.email
    })
    .exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        let passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );

        if (!passwordIsValid) {
            return res.status(401).send({ accessToken: null, message: "Invalid password" });
        }

        let token = jwt.sign({ id: user.id }, config.secret, { expiresIn: 86400 });

        res.send({
            id: user._id,
            name: user.name,
            email: user.email,
            accessToken: token
        })
    })
}