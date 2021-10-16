const { Router } = require("express");
const RecipeController = require("../controllers/RecipeController");
const middlewares = require("../auth/middlewares");

const router = Router();

router
  .route("/recipe")
  .get([middlewares.bearer, middlewares.rbac], RecipeController.index)
  .post([middlewares.bearer, middlewares.rbac], RecipeController.store);

router
  .route("/recipe/:id")
  .get([middlewares.bearer, middlewares.rbac], RecipeController.show)
  .put([middlewares.bearer, middlewares.rbac], RecipeController.update);

module.exports = router;
