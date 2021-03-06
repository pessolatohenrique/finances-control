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
      UserEarning.belongsTo(models.User, {
        foreignKey: "userId",
      });

      UserEarning.belongsTo(models.Earning, {
        foreignKey: "earningId",
      });
    }

    static mountQuery(month, year, user) {
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
