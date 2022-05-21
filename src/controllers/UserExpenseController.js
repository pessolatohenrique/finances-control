const db = require("../models");
const { Op } = require("sequelize");
const moment = require("moment");
const User = require("../models").User;
const Expense = require("../models").Expense;
const Category = require("../models").Category;
const UserExpense = require("../models").UserExpense;
const { NotFoundError, BadRequestError } = require("../utils/Errors");

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

class UserExpenseController {
  static async index(req, res, next) {
    try {
      const { month, year } = req.query;
      let whereCondition = UserExpense.mountQuery(month, year, req.user);

      const result = await UserExpense.findAll({
        where: whereCondition,
        include: includeExpense,
      });

      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  }

  static async show(req, res, next) {
    try {
      const { id } = req.params;

      const result = await UserExpense.findOne({
        where: { id },
        include: [User, Expense],
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
          (userId, expenseId, categoryId, value, transaction_date, createdAt, updatedAt) VALUES 
          (?, ?, ?, ?, ?, ?, ?);`,
          {
            replacements: [
              await req.user.id,
              await createdExpense.id,
              expense.categoryId,
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
      return next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const updated = await UserExpense.update(
        {
          value: req.body.value,
          transaction_date: req.body.transaction_date,
        },
        { where: { id } }
      );

      if (updated) {
        const result = await UserExpense.findOne({
          where: { id },
        });
        if (!result) throw new NotFoundError();
        return res.status(200).json(result);
      }
    } catch (error) {
      return next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params;

      const updatedDeleted = await UserExpense.destroy({
        where: { id },
      });

      if (updatedDeleted) {
        return res.status(200).json({ message: `${id} was deleted` });
      }

      throw new NotFoundError();
    } catch (error) {
      return next(error);
    }
  }

  static async restore(req, res, next) {
    try {
      const { id } = req.params;

      const restored = await UserExpense.restore({ where: { id } });

      if (restored) {
        return res.status(200).json({ message: `${id} was restored` });
      }

      throw new NotFoundError();
    } catch (error) {
      return next(error);
    }
  }
}

module.exports = UserExpenseController;
