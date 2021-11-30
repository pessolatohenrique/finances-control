"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("users", "recipeId", {
      type: Sequelize.INTEGER,
      allowNull: true,
      after: "role",
      references: {
        model: "recipes", // Name of the created table
        key: "id",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("users", "recipeId");
  },
};
