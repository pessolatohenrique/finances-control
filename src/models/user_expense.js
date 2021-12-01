"use strict";
const { Model, Op } = require("sequelize");
const moment = require("moment");

module.exports = (sequelize, DataTypes) => {
  class UserExpense extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserExpense.belongsTo(models.Category, {
        foreignKey: "categoryId",
      });
    }

    static mountQuery(month, user) {
      let whereCondition = { id: user.id };

      if (month) {
        // lógica na model, montando o where por month
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

      return whereCondition;
    }
  }
  UserExpense.init(
    {
      value: { type: DataTypes.FLOAT, allowNull: false },
      transaction_date: { type: DataTypes.DATE, allowNull: false },
    },
    {
      sequelize,
      modelName: "UserExpense",
      tableName: "user_expense",
    }
  );
  return UserExpense;
};
