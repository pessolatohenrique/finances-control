const bodyParser = require("body-parser");
const authorRoutes = require("./author");
const bookRoutes = require("./book");
const userRoutes = require("./user");

module.exports = (app) => {
  app.use(bodyParser.json());
  app.use(userRoutes);
  app.use(authorRoutes);
  app.use(bookRoutes);
};
