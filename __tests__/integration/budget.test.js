const request = require("supertest");
const app = require("../../src");
const { loginUser } = require("./common");
const moment = require("moment");

let token = null;

describe("Budget Calculation", () => {
  beforeAll(async () => {
    const response = await loginUser();
    token = response.body.accessToken;
  });

  it("should summarize budget when there are records", async () => {
    const response = await request(app)
      .get(`/budget/summarize?month=1&year=${moment().format("YYYY")}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.sum_earning).toBe(4150);
    expect(response.body.sum_expense).toBe(850);
    expect(response.body.Earnings.length).toBeGreaterThan(0);
    expect(response.body.Expenses.length).toBeGreaterThan(0);
  });

  it("should summarize budget when there are no records", async () => {
    const response = await request(app)
      .get(`/budget/summarize?month=12&year=${moment().format("YYYY")}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.sum_earning).toBe(0);
    expect(response.body.sum_expense).toBe(0);
    expect(response.body.Earnings.length).toBe(0);
    expect(response.body.Expenses.length).toBe(0);
    expect(response.body.recipe_comparative.length).toBe(0);
  });

  it("should compare recipe, earnings and expenses when there are records", async () => {
    const response = await request(app)
      .get(`/budget/summarize?month=1&year=${moment().format("YYYY")}`)
      .set("Authorization", `Bearer ${token}`);

    const recipe_comparative = response.body.recipe_comparative;

    expect(recipe_comparative[0].name).toBe("Essencial");
    expect(recipe_comparative[0].percentage).toBe(55);
    expect(recipe_comparative[0].value_expected).toBe(2282.5);
    expect(recipe_comparative[0].value_spent).toBe(550);
    expect(recipe_comparative[0].percentage_spent).toBe(13.25);
  });
});
