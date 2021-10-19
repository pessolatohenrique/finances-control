const { Router } = require("express");
const CategoryController = require("../controllers/CategoryController");
const middlewares = require("../auth/middlewares");

const router = Router();

router
  .route("/category")
  .get([middlewares.bearer, middlewares.rbac], CategoryController.index)
  .post([middlewares.bearer, middlewares.rbac], CategoryController.store);

router
  .route("/category/:id")
  .get([middlewares.bearer, middlewares.rbac], CategoryController.show)
  .put([middlewares.bearer, middlewares.rbac], CategoryController.update);

module.exports = router;
