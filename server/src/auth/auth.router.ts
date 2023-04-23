const authRouter = require("express").Router();
const authController = require("./auth.controller");

authRouter.route("/").post(authController.login);

module.exports = authRouter;
