const bodyParser = require("body-parser");
const userRoutes = require("./user");
const recipeRoutes = require("./recipe");
const categoryRoutes = require("./category");
const recipeCategoryRoutes = require("./recipe_category");

module.exports = (app) => {
  app.use(bodyParser.json());
  app.use(userRoutes);
  app.use(recipeRoutes);
  app.use(categoryRoutes);
  app.use(recipeCategoryRoutes);
};
