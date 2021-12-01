"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Expense extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Expense.belongsToMany(models.User, {
        through: models.UserExpense,
        foreignKey: "expenseId",
      });

      Expense.belongsTo(models.UserExpense, {
        foreignKey: "id",
        as: "userExpenseCategory",
      });
    }
  }
  Expense.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true },
      },
      isPublic: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Expense",
      tableName: "expenses",
    }
  );
  return Expense;
};
