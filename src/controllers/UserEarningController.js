const db = require("../models");
const { Op } = require("sequelize");
const moment = require("moment");
const User = require("../models").User;
const Earning = require("../models").Earning;
const { NotFoundError, BadRequestError } = require("../utils/Errors");

class UserEarningController {
  static async index(req, res, next) {
    try {
      const { month } = req.query;
      let whereCondition = { id: req.user.id };

      if (month) {
        whereCondition = {
          ...whereCondition,
          "$Earnings.UserEarning.transaction_date$": {
            [Op.between]: [
              moment().format(`YYYY-${month}-01`),
              moment().format(`YYYY-${month}-31`),
            ],
          },
        };
      }

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
      const { earning_id } = req.params;
      const result = await Earning.findOne({
        where: {
          "$Users.id$": req.user.id,
          id: earning_id,
        },
        include: User,
      });

      if (!result) throw new NotFoundError();

      return res.status(200).json(result);
    } catch (error) {
      console.log("error", error);
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
          `INSERT INTO finance_control.user_earning 
          (userId, earningId, value, transaction_date, createdAt, updatedAt) VALUES 
          (?, ?, ?, ?, ?, ?);`,
          {
            replacements: [
              req.user.id,
              createdEarning.id,
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
      return next(error);
    }
  }
}

module.exports = UserEarningController;
