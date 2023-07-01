const { Op } = require("sequelize");
const moment = require("moment");
const User = require("../models").User;
const Earning = require("../models").Earning;
const UserEarning = require("../models").UserEarning;

class UserEarningStrategy {
  constructor() {
    this.whereCondition = null;
  }

  async findAllEntity() {
    const earnings = await UserEarning.findAll({
      attributes: { include: ["id"] },
      where: this.whereCondition,
      include: [User, Earning],
    });

    return earnings;
  }

  async sumValues() {
    console.log("where sum: ", this.whereCondition);
    const sum_earning = await UserEarning.sum("value", {
      attribute: "sum",
      where: this.whereCondition,
    });

    return sum_earning;
  }

  mountQuery({ month, year, user }) {
    let whereCondition = { userId: user.id };

    if (month) {
      // lógica na model, montando o where por month
      whereCondition = {
        ...whereCondition,
        $transaction_date$: {
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

module.exports = UserEarningStrategy;