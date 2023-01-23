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
const request = require("supertest");
const server = require("../app");
describe("US-01: Create A New User", () => {
    test("Return 404 For Invalid Path", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request(server).get("/badroute");
        expect(response.status).toEqual(404);
        expect(response.body.error).toContain("/badroute");
    }));
    test("Return 400 For Missing Username", () => __awaiter(void 0, void 0, void 0, function* () {
        const user = {
            password: "test@password123",
        };
        const response = yield request(server).post("/register").send({ data: user });
        expect(response.status).toEqual(400);
        expect(response.body.error).toContain("username");
    }));
    test("Return 400 For Empty Username", () => __awaiter(void 0, void 0, void 0, function* () {
        const user = {
            username: "",
            password: "test@password123",
        };
        const response = yield request(server).post("/register").send({ data: user });
        expect(response.status).toEqual(400);
        expect(response.body.error).toContain("username");
    }));
    test("Return 400 For Missing Password", () => __awaiter(void 0, void 0, void 0, function* () {
        const user = {
            username: "TestUsername123",
        };
        const response = yield request(server).post("/register").send({ data: user });
        expect(response.status).toEqual(400);
        expect(response.body.error).toContain("password");
    }));
    test("Return 400 For Empty Password", () => __awaiter(void 0, void 0, void 0, function* () {
        const user = {
            username: "TestUsername123",
            password: "",
        };
        const response = yield request(server).post("/register").send({ data: user });
        expect(response.status).toEqual(400);
        expect(response.body.error).toContain("password");
    }));
    test("Return 201 For Successful User Creation", () => __awaiter(void 0, void 0, void 0, function* () {
        const user = {
            username: "TestUsername123",
            password: "test@password123",
        };
        const response = yield request(server).post("/register").send({ data: user });
        expect(response.status).toEqual(201);
        expect(response.error).toBeUndefined();
        expect(response.body.data).toContain(expect.objectContaining({
            username: "TestUsername123",
            password: "test@password123",
        }));
    }));
});
