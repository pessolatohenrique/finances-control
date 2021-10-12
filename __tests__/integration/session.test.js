const request = require("supertest");
const app = require("../../src");

describe("Authentication", () => {
  it("should authenticate with valid credentials", async () => {
    const response = await request(app).post("/login").send({
      username: "pessolatohenrique",
      password: process.env.CORRECT_PASSWORD_TEST,
    });

    const responseRefresh = await request(app).post("/refresh_token").send({
      refreshToken: response.body.refreshToken,
    });

    const responseRefreshInvalid = await request(app)
      .post("/refresh_token")
      .send({
        refreshToken: 123213,
      });

    expect(response.status).toBe(200);
    expect(responseRefresh.status).toBe(200);
    expect(responseRefreshInvalid.status).toBe(401);
  });

  it("should not authenticate with invalid credentials", async () => {
    const response = await request(app).post("/login").send({
      username: "pessolatohenrique",
      password: "fakepassword",
    });

    expect(response.status).toBe(401);
  });
});
