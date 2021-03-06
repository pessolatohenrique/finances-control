const { Router } = require("express");
const EarningController = require("../controllers/EarningController");
const middlewares = require("../auth/middlewares");

const router = Router();

router
  .route("/earning")
  .get([middlewares.bearer, middlewares.rbac], EarningController.index)
  .post([middlewares.bearer, middlewares.rbac], EarningController.store);

router
  .route("/earning/:id")
  .get([middlewares.bearer, middlewares.rbac], EarningController.show)
  .put([middlewares.bearer, middlewares.rbac], EarningController.update);

router
  .route("/earning/:id")
  .delete([middlewares.bearer, middlewares.rbac], EarningController.delete);

router
  .route("/earning/:id/restore")
  .put([middlewares.bearer, middlewares.rbac], EarningController.restore);

module.exports = router;
