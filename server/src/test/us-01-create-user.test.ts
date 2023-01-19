import { describe, expect, test } from "@jest/globals";
import request from "supertest";
import app from "../app";

describe("US-01. Create A New User", () => {
    test("Returns 201 status for POST request", async () => {
        const username="eforeman70";
        const password="ILoveDonn@4ever";
        
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