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

  it("should save userEarning when earning is empty", async () => {
    const response = await request(app)
      .post("/user_earning")
      .set("Authorization", `Bearer ${token}`)
      .send({
        earnings: [],
      });

    expect(response.status).toBe(200);
  });

  it("should not save when relation fields are not empty", async () => {
    const response = await request(app)
      .post("/user_earning")
      .set("Authorization", `Bearer ${token}`)
      .send({
        earnings: [
          {
            name: "Salário",
            isPublic: true,
          },
          {
            name: "Renda extra",
            isPublic: true,
          },
        ],
      });

    expect(response.status).toBe(400);
  });

  it("should not save when earning name is empty", async () => {
    const response = await request(app)
      .post("/user_earning")
      .set("Authorization", `Bearer ${token}`)
      .send({
        earnings: [
          {
            name: "",
            isPublic: true,
            value: 2000,
            transaction_date: "2021-11-09",
          },
        ],
      });

    expect(response.body).toHaveProperty("errors");
  });

  it("should save user with earnings", async () => {
    const response = await request(app)
      .post("/user_earning")
      .set("Authorization", `Bearer ${token}`)
      .send({
        earnings: [
          {
            name: "Salário mensal",
            isPublic: true,
            value: 3500,
            transaction_date: "2021-11-09",
          },
          {
            name: "Renda extra fim de semana",
            isPublic: true,
            value: 2001,
            transaction_date: "2021-11-09",
          },
        ],
      });

    expect(response.status).toBe(200);
    // expect(response.body.Earnings.length).toBe(4);
  });

  it("should not found when earning not exists", async () => {
    const response = await request(app)
      .get("/user_earning/9999")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(404);
  });

  it("should found when earning exists", async () => {
    const response = await request(app)
      .get("/user_earning/2")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("name", "Renda extra");
  });

  it("should update when earning exists", async () => {
    const response = await request(app)
      .put("/user_earning/1")
      .set("Authorization", `Bearer ${token}`)
      .send({ value: 3000, transaction_date: "2021-11-10" });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("value", 3000);
  });

  it("should delete when user_earning exists", async () => {
    const response = await request(app)
      .delete("/user_earning/2")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
  });

  it("should not delete when user_earning not exists", async () => {
    const response = await request(app)
      .delete("/user_earning/5911")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(404);
  });

  it("should restore when user_earning exists", async () => {
    const response = await request(app)
      .put("/user_earning/2/restore")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
  });

  it("should not restore when user_earning not exists", async () => {
    const response = await request(app)
      .delete("/user_earning/45311/restore")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(404);
  });
});
