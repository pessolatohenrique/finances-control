const db = require("../models");
const { Op } = require("sequelize");
const moment = require("moment");
const User = require("../models").User;
const Earning = require("../models").Earning;
const UserEarning = require("../models").UserEarning;
const { NotFoundError, BadRequestError } = require("../utils/Errors");

class UserEarningController {
  static async index(req, res, next) {
    try {
      const { month, year } = req.query;
      let whereCondition = UserEarning.mountQuery(month, year, req.user);

      const result = await User.findOne({
        where: whereCondition,
        include: Earning,
      });

      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  }

  static async show(req, res, next) {
    try {
      const { id } = req.params;

      const result = await UserEarning.findOne({
        where: { id },
        include: [User, Earning],
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
      for (const earning of req.body.earnings) {
        const [createdEarning] = await Earning.findOrCreate({
          where: { name: earning.name, isPublic: earning.isPublic },
        });

        if (!earning.value || !earning.transaction_date)
          throw new BadRequestError();

        await db.sequelize.query(
          `INSERT INTO user_earning 
          (userId, earningId, value, transaction_date, createdAt, updatedAt) VALUES 
          (?, ?, ?, ?, ?, ?);`,
          {
            replacements: [
              await req.user.id,
              await createdEarning.id,
              earning.value,
              earning.transaction_date,
              new Date(),
              new Date(),
            ],
          }
        );
      }

      const result = await User.findOne({
        where: { id: req.user.id },
        include: { model: Earning },
      });

      return res.status(200).json(result);
    } catch (error) {
      console.log("ERRORR!!", error);
      return next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const updated = await UserEarning.update(
        {
          value: req.body.value,
          transaction_date: req.body.transaction_date,
        },
        { where: { id } }
      );

      if (updated) {
        const result = await UserEarning.findOne({
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

      const updatedDeleted = await UserEarning.destroy({
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

      const restored = await UserEarning.restore({ where: { id } });

      if (restored) {
        return res.status(200).json({ message: `${id} was restored` });
      }

      throw new NotFoundError();
    } catch (error) {
      return next(error);
    }
  }
}

module.exports = UserEarningController;
