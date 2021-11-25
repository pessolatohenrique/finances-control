const db = require("../models");
const { Op } = require("sequelize");
const moment = require("moment");
const User = require("../models").User;
const Expense = require("../models").Expense;
const UserExpense = require("../models").UserExpense;
const { NotFoundError, BadRequestError } = require("../utils/Errors");

class UserExpenseController {
  static async index(req, res, next) {
    try {
      const { month } = req.query;
      let whereCondition = { id: req.user.id };

      if (month) {
        whereCondition = {
          ...whereCondition,
          "$Expenses.UserExpense.transaction_date$": {
            [Op.between]: [
              moment().format(`YYYY-${month}-01`),
              moment().format(`YYYY-${month}-31`),
            ],
          },
        };
      }

      const result = await User.findOne({
        where: whereCondition,
        include: Expense,
      });

      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  }

  static async show(req, res, next) {
    try {
      const { expense_id } = req.params;
      const result = await Expense.findOne({
        where: {
          "$Users.id$": req.user.id,
          id: expense_id,
        },
        include: User,
      });

      if (!result) throw new NotFoundError();

      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  }

  /**
   * verify alternatives:
   * (1) manual insert into many to many table
   * (2) using hasMany and belongsTo relations
   * https://github.com/sequelize/sequelize/issues/3493
   * However Sequelize still has poor support for non-nunique N:M relations so you might be better off simply working with multiple hasMany/belongsTo
   */
  static async store(req, res, next) {
    try {
      for (const expense of req.body.expenses) {
        const [createdExpense] = await Expense.findOrCreate({
          where: { name: expense.name, isPublic: expense.isPublic },
        });

        if (!expense.value || !expense.transaction_date)
          throw new BadRequestError();

        await db.sequelize.query(
          `INSERT INTO user_expense 
          (userId, expenseId, value, transaction_date, createdAt, updatedAt) VALUES 
          (?, ?, ?, ?, ?, ?);`,
          {
            replacements: [
              await req.user.id,
              await createdExpense.id,
              expense.value,
              expense.transaction_date,
              new Date(),
              new Date(),
            ],
          }
        );
      }

      const result = await User.findOne({
        where: { id: req.user.id },
        include: { model: Expense },
      });

      return res.status(200).json(result);
    } catch (error) {
      console.log("ERROR STORE", error);
      return next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const { expense_id } = req.params;
      const updated = await UserExpense.update(
        {
          value: req.body.value,
          transaction_date: req.body.transaction_date,
        },
        { where: { userId: req.user.id, expenseId: expense_id } }
      );

      if (updated) {
        const result = await UserExpense.findOne({
          where: { userId: req.user.id, expenseId: expense_id },
        });
        if (!result) throw new NotFoundError();
        return res.status(200).json(result);
      }
    } catch (error) {
      console.log("ERROR!!", error);
      return next(error);
    }
  }
}

module.exports = UserExpenseController;
