const { Op } = require("sequelize");
const moment = require("moment");
const Expense = require("../models").Expense;
const Category = require("../models").Category;
const User = require("../models").User;
const UserExpense = require("../models").UserExpense;

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

class UserExpenseStrategy {
  constructor() {
    this.whereCondition = null;
  }

  async findAllEntity() {
    let expenses = await UserExpense.findAll({
      attributes: {
        include: ["id"],
      },
      where: this.whereCondition,
      include: includeExpense,
    });

    expenses = [
      ...new Map(expenses.map((item) => [item["id"], item])).values(),
    ];

    return expenses;
  }

  async sumValues() {
    const sum_expense = await UserExpense.sum("value", {
      attribute: "sum",
      where: this.whereCondition,
    });

    return sum_expense;
  }

  mountQuery({ month, year, user }) {
    let whereCondition = { userId: user.id };

    if (month) {
      // lógica na model, montando o where por month
      whereCondition = {
        ...whereCondition,
        "$UserExpense.transaction_date$": {
          [Op.between]: [
            moment().format(`${year}-${month}-01`),
            moment().format(`${year}-${month}-31`),
          ],
        },
      };
    }

    this.whereCondition = whereCondition;

    return whereCondition;
  }
}

module.exports = UserExpenseStrategy;