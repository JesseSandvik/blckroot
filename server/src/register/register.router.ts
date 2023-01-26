const registerRouter = require("express").Router();
const registerController = require("./register.controller");

registerRouter
    .route("/")
    .post(registerController.create);

module.exports = registerRouter;
