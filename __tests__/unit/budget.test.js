const { Sequelize } = require("sequelize");

const UserEarning = require("../../src/models").UserEarning;
const UserExpense = require("../../src/models").UserExpense;
const Recipe = require("../../src/models").Recipe;
const Budget = require("../../src/business/Budget");

describe("Budget", () => {
  test("it should mount query (user earning) with date interval", async () => {
    const month = 4;
    const year = 2022;
    const user = { id: 1 };

    const result = UserEarning.mountQuery(month, year, user);

    expect(result).toHaveProperty("$transaction_date$");
  });

  test("it should mount query (user earning) with only year interval", async () => {
    const month = null;
    const year = 2022;
    const user = { id: 1 };

    const result = UserEarning.mountQuery(month, year, user);

    expect(result).toHaveProperty("userId");
  });

  test("it should mount query (user expense) with date interval", async () => {
    const month = 4;
    const year = 2022;
    const user = { id: 1 };

    const result = UserExpense.mountQuery(month, year, user);

    expect(result).toHaveProperty("userId");
  });

  test("it should mount query (user expense) with only year interval", async () => {
    const month = null;
    const year = 2022;
    const user = { id: 1 };

    const result = UserExpense.mountQuery(month, year, user);

    expect(result).toHaveProperty("userId");
  });

  test("it should build complete budget", async () => {
    UserEarning.mountQuery = jest.fn().mockReturnValueOnce({
      userId: 1,
      $transaction_date$: { [Symbol("between")]: ["2022-4-01", "2022-4-31"] },
    });

    UserExpense.mountQuery = jest.fn().mockReturnValueOnce({
      userId: 1,
      "$UserExpense.transaction_date$": {
        [Symbol("between")]: ["2022-4-01", "2022-4-31"],
      },
    });

    UserEarning.sum = jest.fn().mockReturnValueOnce(3000);
    UserExpense.sum = jest.fn().mockReturnValueOnce(500);
    UserEarning.findAll = jest.fn().mockReturnValueOnce([]);
    UserExpense.findAll = jest.fn().mockReturnValueOnce([]);
    Recipe.findOne = jest.fn().mockReturnValueOnce({});
    Recipe.compareWithBudget = jest.fn().mockReturnValueOnce([
      {
        name: "Essencial",
        percentage: 55,
        value_expected: 2012.780003356934,
        value_spent: 339.96000000000004,
        percentage_spent: 9.29,
      },
      {
        name: "Para o que quiser (livre estou)",
        percentage: 10,
        value_expected: 365.96000061035164,
        value_spent: 149.97,
        percentage_spent: 4.1,
      },
    ]);

    const result = await Budget.build({
      year: 2022,
      month: 4,
      user: { id: 1 },
    });

    expect(result.sum_earning).toBe(3000);
    expect(result.sum_expense).toBe(500);
    expect(result).toHaveProperty("recipe_comparative");
    expect(result).toHaveProperty("Earnings");
    expect(result).toHaveProperty("Expenses");
  });
});
