"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users = require("../../data/users");
const validProperties = ["username", "password"];
function allPropertiesAreValid(arr) {
    return (req, res, next) => {
        const { data } = req.body;
        arr.forEach((element) => {
            if (!data[element]) {
                next({
                    status: 400,
                    message: `${element} is required.`,
                });
            }
        });
        next();
    };
}
const hasValidProperties = allPropertiesAreValid(validProperties);
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
    create: [hasValidProperties, createUser],
};
