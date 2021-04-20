const { jwtAuth } = require("../middlewares");
const controller = require("../controllers/keys.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

	app.get("/keys", [jwtAuth.verifyToken], controller.listKeys)

    app.post("/keys/create", [jwtAuth.verifyToken], controller.addKey);

    app.post("/keys/bulk-update", [jwtAuth.verifyToken], controller.bulkUpdateKeys);

    app.post("/keys/bulk-delete", [jwtAuth.verifyToken], controller.bulkDeleteKeys);
}