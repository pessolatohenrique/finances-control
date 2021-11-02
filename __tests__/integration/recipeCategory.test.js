const request = require("supertest");
const app = require("../../src/");
const { loginUser } = require("./common");

let token = null;

describe("Recipe Category CRUD", () => {
  beforeAll(async () => {
    const response = await loginUser();
    token = response.body.accessToken;
  });

  it("should save recipe when category is empty", async () => {
    const response = await request(app)
      .post("/recipe_category")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "By Henrique",
        categories: [],
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("name", "By Henrique");
  });

  it("should not save when category name is empty", async () => {
    const response = await request(app)
      .post("/recipe_category")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "By Henrique",
        isPublic: 1,
        categories: [
          { name: "", percentage: 15 },
          { name: "categoria teste 1", percentage: 15 },
          { name: "categoria teste 2", percentage: 15 },
        ],
      });

    expect(response.status).toBe(400);
  });

  it("should save recipe with categories", async () => {
    const response = await request(app)
      .post("/recipe_category")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "By Henrique 2",
        isPublic: 1,
        categories: [
          { name: "categoria teste 1", percentage: 15 },
          { name: "categoria teste 2", percentage: 15 },
          { name: "categoria teste 3", percentage: 15 },
        ],
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("name", "By Henrique 2");
    expect(response.body.Categories.length).toBe(3);
  });

  it("should save recipe with new categories and keep old categories", async () => {
    const response = await request(app)
      .post("/recipe_category")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "By Henrique 2",
        isPublic: 1,
        categories: [
          { name: "categoria teste 4", percentage: 15 },
          { name: "categoria teste 5", percentage: 15 },
        ],
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("name", "By Henrique 2");
    expect(response.body.Categories.length).toBe(5);
  });
});
