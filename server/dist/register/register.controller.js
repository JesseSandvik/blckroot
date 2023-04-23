"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validation_1 = require("../middleware/validation");
const users = require("../../data/users");
const validProperties = ["email", "password"];
const hasValidProperties = (0, validation_1.allPropertiesAreValid)(validProperties);
function createUser(req, res) {
    const { email, password } = req.body.data;
    const newUser = {
        email,
        password,
    };
    users.push(newUser);
    res.status(201).json({ data: newUser });
}
module.exports = {
    create: [hasValidProperties, validation_1.validateEmailAddress, createUser],
};
