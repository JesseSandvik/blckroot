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
const { users, addUser } = require("../../data/users.js");
const validProperties = ["email", "password"];
const hasValidProperties = (0, validation_1.allPropertiesAreValid)(validProperties);
function createUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body.data;
        const hashedPassword = yield (0, bcrypt_1.hash)(password, 10);
        const newUser = {
            id: `AF${Math.random()}`,
            email,
            password: hashedPassword,
        };
        addUser(newUser);
        console.log({ newUser });
        res.status(201).json({ data: newUser });
    });
}
module.exports = {
    create: [hasValidProperties, validation_1.emailFormatIsValid, createUser],
};
