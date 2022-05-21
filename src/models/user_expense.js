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

      UserExpense.belongsTo(models.User, {
        foreignKey: "userId",
      });

      UserExpense.belongsTo(models.Expense, {
        foreignKey: "expenseId",
      });
    }

    static mountQuery(month, year, user) {
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
      paranoid: true,
      modelName: "UserExpense",
      tableName: "user_expense",
    }
  );
  return UserExpense;
};
