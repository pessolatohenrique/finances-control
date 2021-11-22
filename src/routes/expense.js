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

module.exports = router;
