const UserEarning = require("../models").UserEarning;
const UserExpense = require("../models").UserExpense;
const Expense = require("../models").Expense;
const Category = require("../models").Category;
const Recipe = require("../models").Recipe;
const User = require("../models").User;
const Earning = require("../models").Earning;

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

class Budget {
  static async build({ year, month, user }) {
    const where_condition_earning = await UserEarning.mountQuery(
      month,
      year,
      user
    );

    const where_condition_expense = await UserExpense.mountQuery(
      month,
      year,
      user
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

    const recipe = await Recipe.findOne({
      where: { id: user.recipeId },
      include: Category,
    });

    const earning_data = { sum_earning, earnings };
    const expense_data = { sum_expense, expenses };

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

    return result;
  }
}

module.exports = Budget;
