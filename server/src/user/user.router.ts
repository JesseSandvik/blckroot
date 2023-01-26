const userRouter = require("express").Router();
const userController = require("./user.controller");

userRouter
    .route("/:id")
    .get(userController.read);

module.exports = userRouter;
