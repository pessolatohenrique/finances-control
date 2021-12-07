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

router
  .route("/category/:id")
  .delete([middlewares.bearer, middlewares.rbac], CategoryController.delete);

router
  .route("/category/:id/restore")
  .put([middlewares.bearer, middlewares.rbac], CategoryController.restore);

module.exports = router;
