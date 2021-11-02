"use strict";
const model = require("../models").RecipeCategory;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const result = await model.findOne({ where: { recipeId: 1 } });

    if (result) return false;

    await queryInterface.bulkInsert(
      "recipe_category",
      [
        {
          recipeId: 1,
          categoryId: 1,
          percentage: 55,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 1,
          categoryId: 5,
          percentage: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 1,
          categoryId: 2,
          percentage: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 1,
          categoryId: 4,
          percentage: 20,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 1,
          categoryId: 3,
          percentage: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("recipe_category", null, {});
  },
};
