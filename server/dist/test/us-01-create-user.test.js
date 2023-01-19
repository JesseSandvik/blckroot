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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
(0, globals_1.describe)("US-01. Create A New User", () => {
    (0, globals_1.test)("Returns 201 status for POST request", () => __awaiter(void 0, void 0, void 0, function* () {
        const username = "eforeman70";
        const password = "ILoveDonn@4ever";
        const response = yield (0, supertest_1.default)(app_1.default).post("/register").send({ username: username, password: password });
        (0, globals_1.expect)(response.status).toEqual(201);
        (0, globals_1.expect)(response.body.error).toBeUndefined();
        (0, globals_1.expect)(response.body.data).toEqual(globals_1.expect.objectContaining({
            username: username,
            password: password,
        }));
    }));
});
