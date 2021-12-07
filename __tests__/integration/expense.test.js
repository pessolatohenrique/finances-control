const request = require("supertest");
const app = require("../../src");
const { loginUser } = require("./common");

let token = null;

describe("Expense CRUD", () => {
  beforeAll(async () => {
    const response = await loginUser();
    token = response.body.accessToken;
  });

  it("should list expenses", async () => {
    const response = await request(app)
      .get("/expense")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("should detail specific expense", async () => {
    const response = await request(app)
      .get("/expense/1")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("name", "Energia Elétrica");
  });

  it("should not found unexpected expense", async () => {
    const response = await request(app)
      .get("/expense/5911")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(404);
  });

  it("should store expense", async () => {
    const response = await request(app)
      .post("/expense")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "expense Test" });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("name", "expense Test");
  });

  it("should not store expense with blank fields", async () => {
    const response = await request(app)
      .post("/expense")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "" });

    expect(response.status).toBe(400);
  });

  it("should not store expense with not unique name", async () => {
    const response = await request(app)
      .post("/expense")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "expense Test" });

    expect(response.status).toBe(400);
  });

  it("should update expense with fields", async () => {
    const response = await request(app)
      .put("/expense/1")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "expense Updated" });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("name", "expense Updated");
  });

  it("should not update when not exists expense", async () => {
    const response = await request(app)
      .put("/expense/5911")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "expense Updated" });

    expect(response.status).toBe(404);
  });

  it("should delete when expense exists", async () => {
    const response = await request(app)
      .delete("/expense/2")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
  });

  it("should not delete when expense not exists", async () => {
    const response = await request(app)
      .delete("/expense/5911")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(404);
  });

  it("should restore when expense exists", async () => {
    const response = await request(app)
      .put("/expense/2/restore")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
  });

  it("should not restore when expense not exists", async () => {
    const response = await request(app)
      .delete("/expense/45311/restore")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(404);
  });
});
