import { describe, expect, test } from "@jest/globals";
import request from "supertest";
import app from "../app";

describe("US-01. Create A New User", () => {
    const username="eforeman70";
    const password="ILoveDonn@4ever";

    test("Returns 400 status if data is missing", async () => {
        const response = await request(app).post("/register").send({});

        expect(response.status).toEqual(400);
        expect(response.body.error).toBeDefined();
    });
    test("Returns 400 status if username is missing", async () => {
        const response = await request(app).post("/register").send({ password: password });

        expect(response.status).toEqual(400);
        expect(response.body.error).toBeDefined();
    });
    test("Returns 400 status if username is empty", async () => {
        const response = await request(app).post("/register").send({ username: "", password: password });

        expect(response.status).toEqual(400);
        expect(response.body.error).toBeDefined();
    });
    test("Returns 400 status if password is missing", async () => {
        const response = await request(app).post("/register").send({ username: username });

        expect(response.status).toEqual(400);
        expect(response.body.error).toBeDefined();
    });
    test("Returns 400 status if password is empty", async () => {
        const response = await request(app).post("/register").send({ username: username, password: "" });

        expect(response.status).toEqual(400);
        expect(response.body.error).toBeDefined();
    });
    test("Returns 201 status if POST request successful", async () => {
        const response = await request(app).post("/register").send({ username: username, password: password });

        expect(response.status).toEqual(201);
        expect(response.body.error).toBeUndefined();
        expect(response.body.data).toEqual(
            expect.objectContaining({
                username: username,
                password: password,
            })
        );
    });
});