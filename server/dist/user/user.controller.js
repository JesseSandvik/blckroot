"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users = require("../../data/users");
function userExists(req, res, next) {
    const { userId } = req.params;
    const matchingUser = users.find((user) => user.id === parseInt(userId));
    if (matchingUser) {
        res.locals.user = matchingUser;
        next();
    }
    next({
        status: 404,
        message: `User with Id ${userId} does not exist.`,
    });
}
function readUser(req, res) {
    const data = res.locals.user;
    res.json({ data });
}
module.exports = {
    read: [userExists, readUser],
};
