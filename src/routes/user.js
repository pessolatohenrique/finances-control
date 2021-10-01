const { Router } = require("express");
const passport = require("passport");
const UserController = require("../controllers/UserController");
const middlewares = require("../auth/middlewares");

const router = Router();

router.route("/login").post(middlewares.local, UserController.login);
router.route("/refresh_token").post(middlewares.refresh, UserController.login);
router.route("/forgot_password").post(UserController.forgotPassword);
router.route("/reset_password/:token").get(UserController.resetPassword);

module.exports = router;
