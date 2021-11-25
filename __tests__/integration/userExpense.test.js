const request = require("supertest");
const moment = require("moment");
const app = require("../../src");
const { loginUser } = require("./common");

let token = null;

describe("User Expense CRUD", () => {
  beforeAll(async () => {
    const response = await loginUser();
    token = response.body.accessToken;
  });

  it("should list user expenses", async () => {
    const response = await request(app)
      .get("/user_expense")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.Expenses.length).toBeGreaterThan(0);
  });

  it("should list user expenses in current month", async () => {
    const currentMonth = moment().format("MM");
    const response = await request(app)
      .get(`/user_expense?month=${currentMonth}`)
      .set("Authorization", `Bearer ${token}`);

    const firstResult = response.body.Expenses[0];
    const monthFirstResult = moment(
      firstResult.UserExpense.transaction_date
    ).format("MM");

    expect(response.status).toBe(200);
    expect(response.body.Expenses.length).toBeGreaterThan(0);
    expect(monthFirstResult).toBe(currentMonth);
  });

  it("should list user expenses in other months", async () => {
    const response = await request(app)
      .get(`/user_expense?month=09`)
      .set("Authorization", `Bearer ${token}`);

    const firstResult = response.body.Expenses[0];
    const monthFirstResult = moment(
      firstResult.UserExpense.transaction_date
    ).format("MM");

    expect(response.status).toBe(200);
    expect(response.body.Expenses.length).toBeGreaterThan(0);
    expect(monthFirstResult).toBe("09");
  });

  it("should save UserExpense when expense is empty", async () => {
    const response = await request(app)
      .post("/user_expense")
      .set("Authorization", `Bearer ${token}`)
      .send({
        expenses: [],
      });

    expect(response.status).toBe(200);
  });

  it("should not save when relation fields are not empty", async () => {
    const response = await request(app)
      .post("/user_expense")
      .set("Authorization", `Bearer ${token}`)
      .send({
        expenses: [
          {
            name: "Netflix",
            isPublic: true,
          },
          {
            name: "Amazon Prime",
            isPublic: true,
          },
        ],
      });

    expect(response.status).toBe(400);
  });

  it("should not save when expense name is empty", async () => {
    const response = await request(app)
      .post("/user_expense")
      .set("Authorization", `Bearer ${token}`)
      .send({
        expenses: [
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

  it("should save user with expenses", async () => {
    const response = await request(app)
      .post("/user_expense")
      .set("Authorization", `Bearer ${token}`)
      .send({
        expenses: [
          {
            name: "Conta de luz",
            isPublic: true,
            value: 350,
            transaction_date: "2021-11-09",
          },
          {
            name: "Conta de água",
            isPublic: true,
            value: 200,
            transaction_date: "2021-11-09",
          },
        ],
      });

    expect(response.status).toBe(200);
    // expect(response.body.Expenses.length).toBe(4);
  });

  it("should not found when expense not exists", async () => {
    const response = await request(app)
      .get("/user_expense/9999")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(404);
  });

  it("should found when expense exists", async () => {
    const response = await request(app)
      .get("/user_expense/1")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("name", "Energia Elétrica");
  });

  it("should update when expense exists", async () => {
    const response = await request(app)
      .put("/user_expense/1")
      .set("Authorization", `Bearer ${token}`)
      .send({ value: 3000, transaction_date: "2021-11-10" });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("value", 3000);
  });
});
