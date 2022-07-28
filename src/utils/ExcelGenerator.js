const fs = require("fs");
const path = require("path");
const moment = require("moment");

class ExcelGenerator {
  static async generateBudget(earnings, expenses) {
    const data_earnings = this.generateEarningsData(earnings);
    const data_expenses = this.generateExpensesData(expenses);

    const data_budget = data_earnings + "\n" + data_expenses;

    const file_name = `budget_${moment().format()}.xls`;

    fs.appendFileSync(file_name, data_budget, (err) => {
      if (err) throw err;
    });

    let filePath = path.join(__dirname, `../../${file_name}`);

    return filePath;
  }

  static generateEarningsData(earnings) {
    let data = "";

    data = data + "DESCRIÇÃO" + "\t" + "VALOR" + "\t" + "DATA" + "\n";
    for (let i = 0; i < earnings.length; i++) {
      data =
        data +
        earnings[i].Earning.name +
        "\t" +
        earnings[i].value +
        "\t" +
        moment(earnings[i].transaction_date).format("DD/MM/YYYY") +
        "\n";
    }

    return data;
  }

  static generateExpensesData(expenses) {
    let data = "";

    data =
      data +
      "DESCRIÇÃO" +
      "\t" +
      "CATEGORIA" +
      "\t" +
      "VALOR" +
      "\t" +
      "DATA" +
      "\n";
    for (let i = 0; i < expenses.length; i++) {
      data =
        data +
        expenses[i].Expense.name +
        "\t" +
        expenses[i].Expense.userExpenseCategory.Category.name +
        "\t" +
        expenses[i].value +
        "\t" +
        moment(expenses[i].transaction_date).format("DD/MM/YYYY") +
        "\n";
    }

    return data;
  }
}

module.exports = ExcelGenerator;
