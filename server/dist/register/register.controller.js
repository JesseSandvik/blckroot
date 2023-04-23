"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users = require("../../data/users");
const validProperties = ["email", "password"];
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
function validateEmailAddress(req, res, next) {
    const { email } = req.body.data;
    const EMAIL_REGEX = /^\S+@\S+\.\S+$/;
    if (EMAIL_REGEX.test(email)) {
        next();
    }
    else {
        next({
            status: 400,
            message: "A valid email is required.",
        });
    }
}
const hasValidProperties = allPropertiesAreValid(validProperties);
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
    create: [hasValidProperties, validateEmailAddress, createUser],
};
