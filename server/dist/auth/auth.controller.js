"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = require("bcrypt");
const validation_1 = require("../middleware/validation");
const { users } = require("../../data/users.js");
const validProperties = ["email", "password"];
const hasValidProperties = (0, validation_1.allPropertiesAreValid)(validProperties);
function userExists(req, res, next) {
    const { email } = req.body.data;
    const foundUser = users.find((user) => user.email === email);
    if (foundUser) {
        res.locals.user = foundUser;
        next();
    }
    else {
        next({
            status: 401,
            message: `User not found.`,
        });
    }
}
function passwordIsValid(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { password } = res.locals.user;
        const passwordMatches = yield (0, bcrypt_1.compare)(password, req.body.data.password);
        if (passwordMatches) {
            next();
        }
        else {
            next({
                status: 401,
                message: "Email and password provided do not match our records.",
            });
        }
    });
}
function handleLogin(req, res) {
    const { email, id, password } = res.locals.user;
    res.json({ data: { email, id, password } });
}
module.exports = {
    login: [
        hasValidProperties,
        validation_1.emailFormatIsValid,
        userExists,
        passwordIsValid,
        handleLogin,
    ],
};
