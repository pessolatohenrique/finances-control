const request = require("supertest");
const app = require("../../src");
const { loginUser } = require("./common");

let token = null;

describe("Budget Calculation", () => {
  beforeAll(async () => {
    const response = await loginUser();
    token = response.body.accessToken;
  });

  it("should summarize budget when there are records", async () => {
    const response = await request(app)
      .get("/budget/summarize?month=9")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.sum_earning).toBe(4150);
    expect(response.body.sum_expense).toBe(550);
  });

  it("should summarize budget when there are no records", async () => {
    const response = await request(app)
      .get("/budget/summarize?month=5")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.sum_earning).toBe(0);
    expect(response.body.sum_expense).toBe(0);
  });
});
