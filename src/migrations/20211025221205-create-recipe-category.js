"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("recipe_category", {
      recipeId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "recipes", // Name of the created table
          key: "id",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
      },
      categoryId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "categories", // Name of the created table
          key: "id",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
      },
      percentage: {
        allowNull: false,
        type: Sequelize.DOUBLE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("recipe_category");
  },
};
