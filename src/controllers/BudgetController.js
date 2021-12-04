const db = require("../models");
const { Op } = require("sequelize");
const moment = require("moment");
const User = require("../models").User;
const Earning = require("../models").Earning;
const Expense = require("../models").Expense;
const UserEarning = require("../models").UserEarning;
const UserExpense = require("../models").UserExpense;
const Category = require("../models").Category;
const Recipe = require("../models").Recipe;

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

      const earnings = await User.findOne({
        where: where_condition_earning,
        include: Earning,
      });

      const expenses = await User.findOne({
        where: where_condition_expense,
        include: [
          {
            model: Expense,
            include: [
              {
                model: UserExpense,
                attributes: ["expenseId", "userId"],
                as: "userExpenseCategory",
                include: {
                  model: Category,
                },
              },
            ],
          },
        ],
      });

      const earning_data = { sum_earning, earnings };
      const expense_data = { sum_expense, expenses };

      const recipe = await Recipe.findOne({
        where: { id: req.user.recipeId },
        include: Category,
      });

      const recipe_comparative = await Recipe.compareWithBudget(
        recipe,
        earning_data,
        expense_data
      );

      const result = {
        sum_earning,
        sum_expense,
        recipe_comparative,
        Earnings: (earnings && earnings.Earnings) || [],
        Expenses: (expenses && expenses.Expenses) || [],
      };

      return res.status(200).json(result);
    } catch (error) {
      console.log("eroo...", error);
      return next(error);
    }
  }
}

module.exports = BudgetController;
