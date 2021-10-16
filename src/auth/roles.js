const AccessControl = require("accesscontrol");
const ac = new AccessControl();

ac.grant("user")
  .readAny("book", ["name", "pages"])
  .readAny("recipe")
  .createAny("recipe")
  .updateAny("recipe");

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
