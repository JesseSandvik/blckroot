const router = require("express").Router();
const controller = require("./user.controller");

router
    .route("/")
    .post(controller.create);

module.exports = router;
