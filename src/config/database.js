require("dotenv").config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env",
}); // this line is important!

module.exports = {
  //development: {
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  dialect: "mysql",
  logging: process.env.NODE_ENV === "test" ? false : true,
};
