"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Recipe extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Recipe.belongsToMany(models.Category, {
        through: models.RecipeCategory,
        foreignKey: "recipeId",
      });

      Recipe.hasMany(models.User, {
        foreignKey: "recipeId",
      });
    }
  }
  Recipe.init(
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
      modelName: "Recipe",
      tableName: "recipes",
    }
  );
  return Recipe;
};
