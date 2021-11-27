const db = require("../models");
const { Op } = require("sequelize");
const moment = require("moment");
const User = require("../models").User;
const Earning = require("../models").Earning;
const Expense = require("../models").Expense;
const UserEarning = require("../models").UserEarning;
const UserExpense = require("../models").UserExpense;

const { NotFoundError, BadRequestError } = require("../utils/Errors");

class BudgetController {
  static async index(req, res, next) {
    try {
      const { month } = req.query;
      const where_condition_earning = await UserEarning.mountQuery(
        month,
        req.user
      );
      const where_condition_expense = await UserExpense.mountQuery(
        month,
        req.user
      );

      const sum_earning = await User.sum("Earnings.UserEarning.value", {
        attribute: "sum",
        where: where_condition_earning,
        include: [Earning],
      });

      const sum_expense = await User.sum("Expenses.UserExpense.value", {
        attribute: "sum",
        where: where_condition_expense,
        include: [Expense],
      });

      const result = {
        sum_earning,
        sum_expense,
      };

      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  }
}

module.exports = BudgetController;
