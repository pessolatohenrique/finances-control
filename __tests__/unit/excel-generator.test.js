const moment = require("moment");
const fs = require("fs");
const path = require("path");
const ExcelGenerator = require("../../src/utils/ExcelGenerator");

describe("generateBudget", () => {
  const mockEarnings = [
    {
      Earning: {
        name: "Salário",
        value: "3000",
        transaction_date: "2022-01-01",
      },
    },
  ];

  const mockExpenses = [
    {
      Expense: {
        name: "Internet",
        value: "300",
        userExpenseCategory: { Category: { name: "Essencial" } },
        transaction_date: "2022-01-01",
      },
    },
  ];

  afterEach(() => {});

  it("should generate and return the path of a valid budget file", async () => {
    const expectedFilePath = path.join(
      __dirname,
      `../../budget_${moment().format()}.xls`
    );

    const result = await ExcelGenerator.generateBudget(
      mockEarnings,
      mockExpenses
    );

    expect(result).toEqual(expectedFilePath);
    expect(fs.existsSync(result)).toBe(true);
  });
});
