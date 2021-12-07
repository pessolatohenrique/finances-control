const request = require("supertest");
const app = require("../../src");
const { loginUser } = require("./common");

let token = null;

describe("Earning CRUD", () => {
  beforeAll(async () => {
    const response = await loginUser();
    token = response.body.accessToken;
  });

  it("should list earnings", async () => {
    const response = await request(app)
      .get("/earning")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("should detail specific earning", async () => {
    const response = await request(app)
      .get("/earning/1")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("name", "Salário");
  });

  it("should not found unexpected earning", async () => {
    const response = await request(app)
      .get("/earning/5911")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(404);
  });

  it("should store earning", async () => {
    const response = await request(app)
      .post("/earning")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Earning Test" });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("name", "Earning Test");
  });

  it("should not store earning with blank fields", async () => {
    const response = await request(app)
      .post("/earning")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "" });

    expect(response.status).toBe(400);
  });

  it("should not store earning with not unique name", async () => {
    const response = await request(app)
      .post("/earning")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Earning Test" });

    expect(response.status).toBe(400);
  });

  it("should update earning with fields", async () => {
    const response = await request(app)
      .put("/earning/1")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Earning Updated" });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("name", "Earning Updated");
  });

  it("should not update when not exists earning", async () => {
    const response = await request(app)
      .put("/earning/5911")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Earning Updated" });

    expect(response.status).toBe(404);
  });

  it("should delete when earning exists", async () => {
    const response = await request(app)
      .delete("/earning/2")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
  });

  it("should not delete when earning not exists", async () => {
    const response = await request(app)
      .delete("/earning/5911")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(404);
  });

  it("should restore when earning exists", async () => {
    const response = await request(app)
      .put("/earning/2/restore")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
  });

  it("should not restore when earning not exists", async () => {
    const response = await request(app)
      .delete("/earning/45311/restore")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(404);
  });
});
