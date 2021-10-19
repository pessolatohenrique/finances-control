const bodyParser = require("body-parser");
const userRoutes = require("./user");
const recipeRoutes = require("./recipe");
const categoryRoutes = require("./category");

module.exports = (app) => {
  app.use(bodyParser.json());
  app.use(userRoutes);
  app.use(recipeRoutes);
  app.use(categoryRoutes);
};
