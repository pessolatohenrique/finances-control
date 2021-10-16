const bodyParser = require("body-parser");
const userRoutes = require("./user");
const recipeRoutes = require("./recipe");

module.exports = (app) => {
  app.use(bodyParser.json());
  app.use(userRoutes);
  app.use(recipeRoutes);
};
