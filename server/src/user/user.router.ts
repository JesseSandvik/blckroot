const userRouter = require("express").Router();
const userController = require("./user.controller");

userRouter
    .route("/:userId")
    .get(userController.read);

module.exports = userRouter;
