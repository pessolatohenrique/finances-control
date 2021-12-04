const request = require("supertest");
const app = require("../../src");
const { loginUser } = require("./common");

let token = null;

describe("Category CRUD", () => {
  beforeAll(async () => {
    const response = await loginUser();
    token = response.body.accessToken;
  });

  it("should list categories", async () => {
    const response = await request(app)
      .get("/category")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("should detail specific category", async () => {
    const response = await request(app)
      .get("/category/1")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("name", "Essencial");
  });

  it("should not found unexpected category", async () => {
    const response = await request(app)
      .get("/category/5911")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(404);
  });

  it("should store category", async () => {
    const response = await request(app)
      .post("/category")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "category Test" });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("name", "category Test");
  });

  it("should not store category with blank fields", async () => {
    const response = await request(app)
      .post("/category")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "" });

    expect(response.status).toBe(400);
  });

  it("should not store category with not unique name", async () => {
    const response = await request(app)
      .post("/category")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "category Test" });

    expect(response.status).toBe(400);
  });

  it("should update category with fields", async () => {
    const response = await request(app)
      .put("/category/2")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "category Updated" });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("name", "category Updated");
  });

  it("should not update when not exists category", async () => {
    const response = await request(app)
      .put("/category/5911")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "category Updated" });

    expect(response.status).toBe(404);
  });
});
