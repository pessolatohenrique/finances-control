const { Router } = require("express");
const RecipeCategoryController = require("../controllers/RecipeCategoryController");
const middlewares = require("../auth/middlewares");

const router = Router();

router
  .route("/recipe_category")
  //   .get([middlewares.bearer, middlewares.rbac], CategoryController.index)
  .post([middlewares.bearer, middlewares.rbac], RecipeCategoryController.store);

router.route("/recipe_category/:id");
//   .get([middlewares.bearer, middlewares.rbac], CategoryController.show)
//   .put([middlewares.bearer, middlewares.rbac], CategoryController.update);

module.exports = router;
