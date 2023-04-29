const request = require("supertest");
const server = require("../app");
const { users } = require("../../data/users");

describe("US-01: Create A New User", () => {
  beforeEach(() => {
    users.splice(0, users.length);
  });
  test("Return 404 For Invalid Path", async () => {
    const response = await request(server).get("/badroute");

    expect(response.status).toEqual(404);
    expect(response.body.error).toContain("/badroute");
  });
  test("Return 400 For Missing Email", async () => {
    const user = {
      password: "test@password123",
    };
    const response = await request(server)
      .post("/register")
      .send({ data: user });

    expect(response.status).toEqual(400);
    expect(response.body.error).toContain("email");
  });
  test("Return 400 For Empty Email", async () => {
    const user = {
      email: "",
      password: "test@password123",
    };
    const response = await request(server)
      .post("/register")
      .send({ data: user });

    expect(response.status).toEqual(400);
    expect(response.body.error).toContain("email");
  });
  test("Return 400 For Missing Password", async () => {
    const user = {
      email: "TestUsername123@yahoo.com",
    };
    const response = await request(server)
      .post("/register")
      .send({ data: user });

    expect(response.status).toEqual(400);
    expect(response.body.error).toContain("password");
  });
  test("Return 400 For Empty Password", async () => {
    const user = {
      email: "TestUsername123@yahoo.com",
      password: "",
    };
    const response = await request(server)
      .post("/register")
      .send({ data: user });

    expect(response.status).toEqual(400);
    expect(response.body.error).toContain("password");
  });
  test("Return 201 For Successful User Creation", async () => {
    const user = {
      email: "TestUsername123@yahoo.com",
      password: "test@password123",
    };
    const response = await request(server)
      .post("/register")
      .send({ data: user });

    expect(response.status).toEqual(201);
    expect(response.body.error).toBeUndefined();
    expect(response.body.data.email).toEqual(user.email);
  });
});

export {};
