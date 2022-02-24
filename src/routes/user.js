const { Router } = require("express");
const passport = require("passport");
const UserController = require("../controllers/UserController");
const middlewares = require("../auth/middlewares");

const router = Router();

// auth routes
router.route("/login").post(middlewares.local, UserController.login);
router.route("/refresh_token").post(middlewares.refresh, UserController.login);
router.route("/forgot_password").post(UserController.forgotPassword);
router.route("/reset_password/:token").get(UserController.resetPassword);

// crud routes
router
  .route("/user")
  .get([middlewares.bearer, middlewares.rbac], UserController.index);

router
  .route("/user/recipe")
  .get([middlewares.bearer], UserController.getRecipe);

router
  .route("/user/:id")
  .get([middlewares.bearer, middlewares.rbac], UserController.show);

router
  .route("/user/:id")
  .put([middlewares.bearer, middlewares.rbac], UserController.update);

router.route("/user").post([], UserController.store);

module.exports = router;
