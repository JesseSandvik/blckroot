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
const { users } = require("../../data/users");
describe("US-01: Create A New User", () => {
    beforeEach(() => {
        users.splice(0, users.length);
    });
    test("Return 404 For Invalid Path", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request(server).get("/badroute");
        expect(response.status).toEqual(404);
        expect(response.body.error).toContain("/badroute");
    }));
    test("Return 400 For Missing Email", () => __awaiter(void 0, void 0, void 0, function* () {
        const user = {
            password: "test@password123",
        };
        const response = yield request(server)
            .post("/register")
            .send({ data: user });
        expect(response.status).toEqual(400);
        expect(response.body.error).toContain("email");
    }));
    test("Return 400 For Empty Email", () => __awaiter(void 0, void 0, void 0, function* () {
        const user = {
            email: "",
            password: "test@password123",
        };
        const response = yield request(server)
            .post("/register")
            .send({ data: user });
        expect(response.status).toEqual(400);
        expect(response.body.error).toContain("email");
    }));
    test("Return 400 For Missing Password", () => __awaiter(void 0, void 0, void 0, function* () {
        const user = {
            email: "TestUsername123@yahoo.com",
        };
        const response = yield request(server)
            .post("/register")
            .send({ data: user });
        expect(response.status).toEqual(400);
        expect(response.body.error).toContain("password");
    }));
    test("Return 400 For Empty Password", () => __awaiter(void 0, void 0, void 0, function* () {
        const user = {
            email: "TestUsername123@yahoo.com",
            password: "",
        };
        const response = yield request(server)
            .post("/register")
            .send({ data: user });
        expect(response.status).toEqual(400);
        expect(response.body.error).toContain("password");
    }));
    test("Return 201 For Successful User Creation", () => __awaiter(void 0, void 0, void 0, function* () {
        const user = {
            email: "TestUsername123@yahoo.com",
            password: "test@password123",
        };
        const response = yield request(server)
            .post("/register")
            .send({ data: user });
        expect(response.status).toEqual(201);
        expect(response.body.error).toBeUndefined();
        expect(response.body.data).toEqual(user);
    }));
});
