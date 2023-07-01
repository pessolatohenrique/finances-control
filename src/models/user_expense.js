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
