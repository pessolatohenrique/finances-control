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
  .get([middlewares.bearer, middlewares.rbac], UserEarningController.show)
  .put([middlewares.bearer, middlewares.rbac], UserEarningController.update);

router
  .route("/user_earning/:id")
  .delete([middlewares.bearer, middlewares.rbac], UserEarningController.delete);

router
  .route("/user_earning/:id/restore")
  .put([middlewares.bearer, middlewares.rbac], UserEarningController.restore);

module.exports = router;
