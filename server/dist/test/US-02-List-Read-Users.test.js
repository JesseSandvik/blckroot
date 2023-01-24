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
const request = require("supertest");
const server = require("../app");
const users = require("../../data/users");
describe("US-02: List / Read Users", () => {
    beforeAll(() => {
        const user1 = {
            id: "1",
            username: "RSanchez",
            password: "get@schwifty"
        };
        const user2 = {
            id: "2",
            username: "JSmith",
            password: "!loveBeth"
        };
        users.push(user1);
        users.push(user2);
    });
    test("Return 404 For Non-Existent User Id", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request(server).get("/users/999999");
        expect(response.status).toEqual(404);
        expect(response.body.error).toBeDefined();
    }));
    test("Return 200 For Found User", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request(server).get("/users?id=1");
        expect(response.status).toEqual(200);
        expect(response.body.data).toHaveLength(1);
        expect(response.body.data).toEqual(expect.objectContaining({
            username: "RSanchez",
            password: "get@schwifty"
        }));
    }));
    test("Return 200 For User List", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request(server).get("/users");
        expect(response.status).toEqual(200);
        expect(response.body.data).toHaveLength(2);
    }));
});
