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
    expect(response.body).toHaveProperty("Categories");
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

  it("should associate user when recipe exists", async () => {
    const response = await request(app)
      .put("/recipe/associate/1")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id", 1);
  });

  it("should disassociate when recipe exists", async () => {
    const responseWhenExists = await request(app)
      .put("/recipe/disassociate")
      .set("Authorization", `Bearer ${token}`);

    expect(responseWhenExists.status).toBe(200);

    const responseWhenNotExists = await request(app)
      .put("/recipe/disassociate")
      .set("Authorization", `Bearer ${token}`);

    expect(responseWhenNotExists.status).toBe(400);

    const responseFinal = await request(app)
      .put("/recipe/associate/1")
      .set("Authorization", `Bearer ${token}`);

    expect(responseFinal.status).toBe(200);
  });

  it("should not associate user when recipe not exists", async () => {
    const response = await request(app)
      .put("/recipe/associate/5911")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(404);
  });

  it("should delete when recipe exists", async () => {
    const response = await request(app)
      .delete("/recipe/2")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
  });

  it("should not delete when recipe not exists", async () => {
    const response = await request(app)
      .delete("/recipe/5911")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(404);
  });

  it("should restore when recipe exists", async () => {
    const response = await request(app)
      .put("/recipe/2/restore")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
  });

  it("should not restore when recipe not exists", async () => {
    const response = await request(app)
      .delete("/recipe/45311/restore")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(404);
  });
});
