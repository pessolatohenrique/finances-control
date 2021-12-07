const { Router } = require("express");
const ExpenseController = require("../controllers/ExpenseController");
const middlewares = require("../auth/middlewares");

const router = Router();

router
  .route("/expense")
  .get([middlewares.bearer, middlewares.rbac], ExpenseController.index)
  .post([middlewares.bearer, middlewares.rbac], ExpenseController.store);

router
  .route("/expense/:id")
  .get([middlewares.bearer, middlewares.rbac], ExpenseController.show)
  .put([middlewares.bearer, middlewares.rbac], ExpenseController.update);

router
  .route("/expense/:id")
  .delete([middlewares.bearer, middlewares.rbac], ExpenseController.delete);

router
  .route("/expense/:id/restore")
  .put([middlewares.bearer, middlewares.rbac], ExpenseController.restore);

module.exports = router;
