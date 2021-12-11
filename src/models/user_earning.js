"use strict";
const { Model, Op } = require("sequelize");
const moment = require("moment");

module.exports = (sequelize, DataTypes) => {
  class UserEarning extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    static mountQuery(month, user) {
      let whereCondition = { id: user.id };

      if (month) {
        // lógica na model, montando o where por month
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

      return whereCondition;
    }
  }
  UserEarning.init(
    {
      value: { type: DataTypes.FLOAT, allowNull: false },
      transaction_date: { type: DataTypes.DATE, allowNull: false },
    },
    {
      sequelize,
      paranoid: true,
      modelName: "UserEarning",
      tableName: "user_earning",
    }
  );
  return UserEarning;
};
