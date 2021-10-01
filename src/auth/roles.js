const AccessControl = require("accesscontrol");
const ac = new AccessControl();

ac.grant("user").readAny("book", ["name", "pages"]);

ac.grant("admin")
  .extend("user")
  .readAny("book")
  .createAny("author")
  .readAny("author")
  .updateAny("author")
  .deleteAny("author");

module.exports = ac;
