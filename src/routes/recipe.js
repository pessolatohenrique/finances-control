const { Router } = require("express");
const RecipeController = require("../controllers/RecipeController");
const middlewares = require("../auth/middlewares");

const router = Router();

router
  .route("/recipe")
  .get([], RecipeController.index)
  .post([middlewares.bearer, middlewares.rbac], RecipeController.store);

router
  .route("/recipe/associate/:id")
  .put([middlewares.bearer, middlewares.rbac], RecipeController.associateUser);

router
  .route("/recipe/disassociate")
  .put(
    [middlewares.bearer, middlewares.rbac],
    RecipeController.disassociateUser
  );

router
  .route("/recipe/:id")
  .get([middlewares.bearer, middlewares.rbac], RecipeController.show)
  .put([middlewares.bearer, middlewares.rbac], RecipeController.update);

router
  .route("/recipe/:id")
  .delete([middlewares.bearer, middlewares.rbac], RecipeController.delete);

router
  .route("/recipe/:id/restore")
  .put([middlewares.bearer, middlewares.rbac], RecipeController.restore);

module.exports = router;
