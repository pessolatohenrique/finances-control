const request = require("supertest");
const app = require("../../src");

let token = null;

describe("User CRUD", () => {
  beforeAll(async () => {
    const response = await request(app).post("/login").send({
      username: "pessolatohenrique",
      password: process.env.CORRECT_PASSWORD_TEST,
    });

    token = response.body.accessToken;
  });

  it("should list users", async () => {
    const response = await request(app)
      .get("/user")
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("should detail specific user", async () => {
    const response = await request(app)
      .get("/user/1")
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("username", "pessolatohenrique");
  });

  it("should not found unexpected user", async () => {
    const response = await request(app)
      .get("/user/5799")
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.status).toBe(404);
  });

  it("should store user", async () => {
    const response = await request(app)
      .post("/user")
      .set("Authorization", `Bearer ${token}`)
      .send({
        username: "testenovousuario",
        email: "testenovousuario@gmail.com",
        role: "user",
        password: process.env.CORRECT_PASSWORD_TEST,
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("username", "testenovousuario");
  });

  it("should not store with blank fields", async () => {
    const response = await request(app)
      .post("/user")
      .set("Authorization", `Bearer ${token}`)
      .send({
        username: "testenovousuario",
      });

    expect(response.status).toBe(400);
  });

  it("should not store with not unique username", async () => {
    const response = await request(app)
      .post("/user")
      .set("Authorization", `Bearer ${token}`)
      .send({
        username: "testenovousuario",
        email: "testenovousuario@gmail.com",
        role: "user",
        password: process.env.CORRECT_PASSWORD_TEST,
      });

    expect(response.status).toBe(400);
  });

  it("should update with fields", async () => {
    const response = await request(app)
      .put(`/user/1`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        username: "pessolatohenrique2",
        email: "pessolatohenrique2@gmail.com",
        role: "user",
        password: process.env.CORRECT_PASSWORD_TEST,
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("username", "pessolatohenrique2");
  });

  it("should not update when not exists user", async () => {
    const response = await request(app)
      .put("/user/5799")
      .set("Authorization", `Bearer ${token}`)
      .send({
        username: "pessolatohenrique2",
        email: "pessolatohenrique2@gmail.com",
        role: "user",
        password: process.env.CORRECT_PASSWORD_TEST,
      });

    expect(response.status).toBe(403);
  });

  it("should request forgot password when user exists", async () => {
    const response = await request(app).post("/forgot_password").send({
      email: "testenovousuario@gmail.com",
    });

    expect(response.status).toBe(200);
  });

  it("should not request forgot password when user does not exist", async () => {
    const response = await request(app).post("/forgot_password").send({
      email: "emailnaoexiste@gmail.com",
    });

    expect(response.status).toBe(404);
  });

  it("should reset password with valid token", async () => {
    const responseForgot = await request(app).post("/forgot_password").send({
      email: "testenovousuario@gmail.com",
    });

    const responseReset = await request(app)
      .get(`/reset_password/${responseForgot.body.token}`)
      .send({
        password: process.env.CORRECT_PASSWORD_TEST,
      });

    expect(responseReset.status).toBe(200);
    expect(responseReset.body).toHaveProperty("message");
  });

  it("should not reset password with invalid token", async () => {
    const responseReset = await request(app).get(`/reset_password/12345`).send({
      password: process.env.CORRECT_PASSWORD_TEST,
    });

    expect(responseReset.status).toBe(401);
  });
});
