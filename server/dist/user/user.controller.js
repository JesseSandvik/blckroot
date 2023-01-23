"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const users = require("../../data/users");
function createUser(req, res) {
    const { username, password } = req.body.data;
    const newUser = {
        username,
        password,
    };
    users.push(newUser);
    res.status(201).json({ data: newUser });
}
module.exports = {
    create: createUser,
};
