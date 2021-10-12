const bodyParser = require("body-parser");
const userRoutes = require("./user");

module.exports = (app) => {
  app.use(bodyParser.json());
  app.use(userRoutes);
};
