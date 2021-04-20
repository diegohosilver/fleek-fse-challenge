const { jwtAuth } = require("../middlewares");
const controller = require("../controllers/requests.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

	app.get("/requests", [jwtAuth.verifyToken], controller.listRequests)
}