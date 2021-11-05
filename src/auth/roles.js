const AccessControl = require("accesscontrol");
const ac = new AccessControl();

ac.grant("user")
  .readAny("book", ["name", "pages"])
  .readAny("recipe")
  .createAny("recipe")
  .updateAny("recipe")
  .readAny("category")
  .createAny("category")
  .updateAny("category")
  .readAny("recipe_category")
  .createAny("recipe_category")
  .readAny("earning")
  .createAny("earning")
  .updateAny("earning");

ac.grant("admin")
  .extend("user")
  .readAny("user")
  .updateAny("user")
  .createAny("user")
  .readAny("book")
  .createAny("author")
  .readAny("author")
  .updateAny("author")
  .deleteAny("author");

module.exports = ac;
