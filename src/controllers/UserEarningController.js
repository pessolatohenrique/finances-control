const { Op } = require("sequelize");
const moment = require("moment");
const User = require("../models").User;
const Earning = require("../models").Earning;

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
}

module.exports = UserEarningController;
