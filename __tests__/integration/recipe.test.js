const request = require("supertest");
const app = require("../../src");
const { loginUser } = require("./common");

let token = null;

describe("Recipe CRUD", () => {
  beforeAll(async () => {
    const response = await loginUser();
    token = response.body.accessToken;
  });

  it("should list recipes", async () => {
    const response = await request(app)
      .get("/recipe")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("should detail specific recipe", async () => {
    const response = await request(app)
      .get("/recipe/1")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("name", "By Nath Arcuri");
  });

  it("should not found unexpected recipe", async () => {
    const response = await request(app)
      .get("/recipe/5911")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(404);
  });

  it("should store recipe", async () => {
    const response = await request(app)
      .post("/recipe")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Recipe Test" });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("name", "Recipe Test");
  });

  it("should not store recipe with blank fields", async () => {
    const response = await request(app)
      .post("/recipe")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "" });

    expect(response.status).toBe(400);
  });

  it("should not store recipe with not unique name", async () => {
    const response = await request(app)
      .post("/recipe")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Recipe Test" });

    expect(response.status).toBe(400);
  });

  it("should update recipe with fields", async () => {
    const response = await request(app)
      .put("/recipe/1")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Recipe Updated" });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("name", "Recipe Updated");
  });

  it("should not update when not exists recipe", async () => {
    const response = await request(app)
      .put("/recipe/5911")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Recipe Updated" });

    expect(response.status).toBe(404);
  });
});
