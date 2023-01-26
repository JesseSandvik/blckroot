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
    test("Return 404 For Non-Existent User Id", async () => {
        const response = await request(server).get("/users/999999");

        expect(response.status).toEqual(404);
        expect(response.body.error).toBeDefined();
    });
    test("Return 200 For Found User", async () => {
        const response = await request(server).get("/users/1");

        expect(response.status).toEqual(200);
        expect(response.body.data).toHaveLength(1);
        expect(response.body.data).toEqual(expect.objectContaining({
            username: "RSanchez",
            password: "get@schwifty"
        }));
    });
    test("Return 200 For User List", async () => {
        const response = await request(server).get("/users");

        expect(response.status).toEqual(200);
        expect(response.body.data).toHaveLength(2);
    });
});

export {};
