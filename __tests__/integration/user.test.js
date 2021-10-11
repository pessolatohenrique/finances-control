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
});
