const { Router } = require("express");
const BookController = require("../controllers/BookController");
const middlewares = require("../auth/middlewares");

const router = Router();

// example with token
router
  .route("/book")
  .get([middlewares.bearer, middlewares.rbac], BookController.index);

// examples without token
router.get("/book/sumPagesByAuthor", BookController.sumPagesByAuthor);
router.get("/book/countByAuthor", BookController.countByAuthor);
router.get("/book/:id", BookController.show);

module.exports = router;
