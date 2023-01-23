const request = require("supertest");
const server = require("../app");

describe("US-01: Create A New User", () => {
    test("Return 404 For Invalid Path", async () => {
        const response = await request(server).get("/badroute");

        expect(response.status).toEqual(404);
        expect(response.body.error).toContain("/badroute");
    });
    test("Return 400 For Missing Username", async () => {
        const user={
            password: "test@password123",
        };
        const response = await request(server).post("/register").send({ data: user });

        expect(response.status).toEqual(400);
        expect(response.body.error).toContain("username");
    });
    test("Return 400 For Empty Username", async () => {
        const user={
            username: "",
            password: "test@password123",
        };
        const response = await request(server).post("/register").send({ data: user });

        expect(response.status).toEqual(400);
        expect(response.body.error).toContain("username");
    });
    test("Return 400 For Missing Password", async () => {
        const user={
            username: "TestUsername123",
        };
        const response = await request(server).post("/register").send({ data: user });

        expect(response.status).toEqual(400);
        expect(response.body.error).toContain("password");
    });
    test("Return 400 For Empty Password", async () => {
        const user={
            username: "TestUsername123",
            password: "",
        };
        const response = await request(server).post("/register").send({ data: user });

        expect(response.status).toEqual(400);
        expect(response.body.error).toContain("password");
    });
    test("Return 201 For Successful User Creation", async () => {
        const user={
            username: "TestUsername123",
            password: "test@password123",
        };
        const response = await request(server).post("/register").send({ data: user });

        expect(response.status).toEqual(201);
        expect(response.error).toBeUndefined();
        expect(response.body.data).toContain(expect.objectContaining({
            username: "TestUsername123",
            password: "test@password123",
        }));
    });
});
