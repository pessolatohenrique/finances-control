"use strict";
const { Model } = require("sequelize");
const Category = require("./category").Category;
const {
  calculateValueByPercentage,
  calculatePercentage,
} = require("../utils/MathCalc");

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

    static mapComparativeRecipe(expenses, sum_earning, user_recipe) {
      let recipe_comparative = [];

      recipe_comparative = [...expenses].map((item) => {
        const category = item.userExpenseCategory.Category;
        const category_name = category.name;

        const recipe_item = [...user_recipe.Categories].find((subitem) => {
          return category.id === subitem.id;
        });

        const percentage = recipe_item.RecipeCategory.percentage;

        const value_expected = calculateValueByPercentage(
          sum_earning,
          percentage
        );

        const value_expense = item.UserExpense.value;

        return {
          category_id: category.id,
          name: category_name,
          percentage,
          value_expected,
          value_expense,
        };
      });

      return recipe_comparative;
    }

    static filterExpensesCategory(recipe_comparative, category_id) {
      return [...recipe_comparative].filter(
        (item) => category_id === item.category_id
      );
    }

    static findRecipeComparative(recipe_comparative, category_id) {
      return [...recipe_comparative].find(
        (subitem) => category_id === subitem.category_id
      );
    }

    static sumComparativeExpenses(expenses) {
      return expenses
        .map((item) => item.value_expense)
        .reduce((prev, next) => prev + next);
    }

    static consolidateComparativeRecipe(recipe_comparative, sum_earning) {
      const categories = [
        ...new Set([...recipe_comparative].map((item) => item.category_id)),
      ];

      const consolidated = [...categories].map((item) => {
        const expenses = this.filterExpensesCategory(recipe_comparative, item);

        const category_item = this.findRecipeComparative(
          recipe_comparative,
          item
        );

        const sum_expenses = this.sumComparativeExpenses(expenses);

        const percentage_spent = calculatePercentage(sum_expenses, sum_earning);

        return {
          name: category_item.name,
          percentage: category_item.percentage,
          value_expected: category_item.value_expected,
          value_spent: sum_expenses,
          percentage_spent,
        };
      });

      return consolidated;
    }

    static async compareWithBudget(user_recipe, earnings_data, expenses_data) {
      let recipe_comparative = [];

      if (!user_recipe) return recipe_comparative;
      if (!expenses_data.expenses) return recipe_comparative;

      recipe_comparative = this.mapComparativeRecipe(
        expenses_data.expenses.Expenses,
        earnings_data.sum_earning,
        user_recipe
      );

      const consolidated = this.consolidateComparativeRecipe(
        recipe_comparative,
        earnings_data.sum_earning
      );

      return consolidated;
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
      paranoid: true,
      modelName: "Recipe",
      tableName: "recipes",
    }
  );
  return Recipe;
};
