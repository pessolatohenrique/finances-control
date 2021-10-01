"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Author extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Author.hasMany(models.Book, {
        foreignKey: "authorId",
      });
    }
  }
  Author.init(
    {
      name: {
        type: DataTypes.STRING,
        unique: { msg: "author name should be unique" },
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [2],
        },
      },
    },
    {
      sequelize,
      paranoid: true,
      modelName: "Author",
      tableName: "authors",
    }
  );
  return Author;
};
