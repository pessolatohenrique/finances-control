const { Router } = require("express");
const UserExpenseController = require("../controllers/UserExpenseController");
const middlewares = require("../auth/middlewares");

const router = Router();

router
  .route("/user_expense")
  .get([middlewares.bearer, middlewares.rbac], UserExpenseController.index)
  .post([middlewares.bearer, middlewares.rbac], UserExpenseController.store);

router
  .route("/user_expense/:expense_id")
  .get([middlewares.bearer, middlewares.rbac], UserExpenseController.show)
  .put([middlewares.bearer, middlewares.rbac], UserExpenseController.update);

router
  .route("/user_expense/:id")
  .delete([middlewares.bearer, middlewares.rbac], UserExpenseController.delete);

router
  .route("/user_expense/:id/restore")
  .put([middlewares.bearer, middlewares.rbac], UserExpenseController.restore);

module.exports = router;
