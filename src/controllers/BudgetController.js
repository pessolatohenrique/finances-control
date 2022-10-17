const User = require("../models").User;
const Earning = require("../models").Earning;
const Expense = require("../models").Expense;
const UserEarning = require("../models").UserEarning;
const UserExpense = require("../models").UserExpense;
const Category = require("../models").Category;
const Recipe = require("../models").Recipe;
const ExcelGenerator = require("../utils/ExcelGenerator");
const InvestimentConsumer = require("../consumers/InvestimentConsumer");

const includeExpense = [
  User,
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
];

class BudgetController {
  static async index(req, res, next) {
    try {
      const { month, year } = req.query;
      const where_condition_earning = await UserEarning.mountQuery(
        month,
        year,
        req.user
      );
      const where_condition_expense = await UserExpense.mountQuery(
        month,
        year,
        req.user
      );

      const sum_earning = await UserEarning.sum("value", {
        attribute: "sum",
        where: where_condition_earning,
      });

      const sum_expense = await UserExpense.sum("value", {
        attribute: "sum",
        where: where_condition_expense,
      });

      const earnings = await UserEarning.findAll({
        attributes: { include: ["id"] },
        where: where_condition_earning,
        include: [User, Earning],
      });

      let expenses = await UserExpense.findAll({
        attributes: {
          include: ["id"],
        },
        where: where_condition_expense,
        include: includeExpense,
      });

      expenses = [
        ...new Map(expenses.map((item) => [item["id"], item])).values(),
      ];

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

      const sum_percentage = Recipe.sumPercentageSpent(recipe_comparative);

      const result = {
        sum_earning,
        sum_expense,
        sum_percentage,
        recipe_comparative,
        Earnings: earnings || [],
        Expenses: expenses || [],
      };

      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  }

  static async export(req, res, next) {
    try {
      const { month, year } = req.query;
      const where_condition_earning = await UserEarning.mountQuery(
        month,
        year,
        req.user
      );

      const result_earning = await UserEarning.findAll({
        attributes: { include: ["id"] },
        where: where_condition_earning,
        include: [User, Earning],
      });

      const where_condition_expense = await UserExpense.mountQuery(
        month,
        year,
        req.user
      );

      let result_expense = await UserExpense.findAll({
        attributes: { include: ["id"] },
        where: where_condition_expense,
        include: includeExpense,
      });

      result_expense = [
        ...new Map(result_expense.map((item) => [item["id"], item])).values(),
      ];

      const budget_xlsx = await ExcelGenerator.generateBudget(
        result_earning,
        result_expense
      );

      return res.status(200).download(budget_xlsx);
    } catch (error) {
      return next(error);
    }
  }

  static async readNewInvestiments(req, res, next) {
    try {
      InvestimentConsumer.readRecents();
      return res.status(204);
    } catch (error) {
      console.log("controller", error);
      return next(error);
    }
  }
}

module.exports = BudgetController;
