const { Router } = require("express");
const BudgetController = require("../controllers/BudgetController");
const middlewares = require("../auth/middlewares");

const router = Router();

router
  .route("/budget/summarize")
  .get([middlewares.bearer, middlewares.rbac], BudgetController.index);

router
  .route("/budget/export")
  .get([middlewares.bearer, middlewares.rbac], BudgetController.export);

module.exports = router;
