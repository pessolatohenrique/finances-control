"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Earning extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Earning.belongsToMany(models.User, {
        through: models.UserEarning,
        foreignKey: "earningId",
      });
    }
  }
  Earning.init(
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
      modelName: "Earning",
      tableName: "earnings",
    }
  );
  return Earning;
};
