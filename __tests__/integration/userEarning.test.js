const request = require("supertest");
const moment = require("moment");
const app = require("../../src");
const { loginUser } = require("./common");

let token = null;

describe("User Earning CRUD", () => {
  beforeAll(async () => {
    const response = await loginUser();
    token = response.body.accessToken;
  });

  it("should list user earnings", async () => {
    const response = await request(app)
      .get("/user_earning")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.Earnings.length).toBeGreaterThan(0);
  });

  it("should list user earnings in current month", async () => {
    const currentMonth = moment().format("MM");
    const response = await request(app)
      .get(`/user_earning?month=${currentMonth}`)
      .set("Authorization", `Bearer ${token}`);

    const firstResult = response.body.Earnings[0];
    const monthFirstResult = moment(
      firstResult.UserEarning.transaction_date
    ).format("MM");

    expect(response.status).toBe(200);
    expect(response.body.Earnings.length).toBeGreaterThan(0);
    expect(monthFirstResult).toBe(currentMonth);
  });

  it("should list user earnings in other months", async () => {
    const response = await request(app)
      .get(`/user_earning?month=09`)
      .set("Authorization", `Bearer ${token}`);

    const firstResult = response.body.Earnings[0];
    const monthFirstResult = moment(
      firstResult.UserEarning.transaction_date
    ).format("MM");

    expect(response.status).toBe(200);
    expect(response.body.Earnings.length).toBeGreaterThan(0);
    expect(monthFirstResult).toBe("09");
  });
});
