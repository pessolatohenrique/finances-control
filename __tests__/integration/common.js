const request = require("supertest");
const app = require("../../src");

async function loginUser() {
  const response = await request(app).post("/login").send({
    username: "pessolatohenrique",
    password: process.env.CORRECT_PASSWORD_TEST,
  });

  return response;
}

module.exports = { loginUser };
