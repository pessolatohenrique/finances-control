const bodyParser = require("body-parser");
const userRoutes = require("./user");
const recipeRoutes = require("./recipe");
const categoryRoutes = require("./category");
const recipeCategoryRoutes = require("./recipe_category");
const earningRoutes = require("./earning");

module.exports = (app) => {
  app.use(bodyParser.json({ extended: true }));
  app.use(userRoutes);
  app.use(recipeRoutes);
  app.use(categoryRoutes);
  app.use(recipeCategoryRoutes);
  app.use(earningRoutes);
};
