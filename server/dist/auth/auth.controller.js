"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validation_1 = require("../middleware/validation");
const users = require("../../data/users");
const validProperties = ["email", "password"];
const hasValidProperties = (0, validation_1.allPropertiesAreValid)(validProperties);
function userExists(req, res, next) {
    const { userId } = req.params;
    const matchingUser = users.find((user) => user.id === parseInt(userId));
    if (matchingUser) {
        res.locals.user = matchingUser;
        next();
    }
    next({
        status: 401,
        message: `User not found.`,
    });
}
function handleLogin(req, res) {
    const { email, password } = res.locals.user.data;
    res.json({ data: { email, password } });
}
module.exports = {
    login: [hasValidProperties, validation_1.validateEmailAddress, userExists, handleLogin],
};
