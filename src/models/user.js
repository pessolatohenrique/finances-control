"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Earning, {
        through: models.UserEarning,
        foreignKey: "userId",
      });

      User.belongsToMany(models.Expense, {
        through: models.UserExpense,
        foreignKey: "userId",
      });
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        unique: { msg: "username should be unique" },
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [2],
        },
      },
      email: {
        type: DataTypes.STRING,
        unique: { msg: "email should be unique" },
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [2],
        },
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
    }
  );
  return User;
};
