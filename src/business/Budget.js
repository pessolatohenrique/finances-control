const Category = require("../models").Category;
const Recipe = require("../models").Recipe;
const BudgetContext = require("./BudgetContext");
const UserEarningStrategy = require("./UserEarningStrategy");
const UserExpenseStrategy = require("./UserExpenseStrategy");

class Budget {
  static async build({ year, month, user }) {
    const budgetContext = new BudgetContext(new UserEarningStrategy());
    budgetContext.mountQuery({ month, year, user });
    const sum_earning = await budgetContext.sumValues();
    const earnings = await budgetContext.findAllEntity();

    budgetContext.setStrategy(new UserExpenseStrategy());
    budgetContext.mountQuery({ month, year, user });
    const sum_expense = await budgetContext.sumValues();
    const expenses = await budgetContext.findAllEntity();

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
