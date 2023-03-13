const UserEarning = require("../../src/models").UserEarning;
const UserExpense = require("../../src/models").UserExpense;

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
});
