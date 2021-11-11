const { Router } = require("express");
const UserEarningController = require("../controllers/UserEarningController");
const middlewares = require("../auth/middlewares");

const router = Router();

router
  .route("/user_earning")
  .get([middlewares.bearer, middlewares.rbac], UserEarningController.index)
  .post([middlewares.bearer, middlewares.rbac], UserEarningController.store);

router
  .route("/user_earning/:earning_id")
  .get([middlewares.bearer, middlewares.rbac], UserEarningController.show);
// router.route("/recipe_category/:id");
//   .get([middlewares.bearer, middlewares.rbac], CategoryController.show)
//   .put([middlewares.bearer, middlewares.rbac], CategoryController.update);

module.exports = router;
