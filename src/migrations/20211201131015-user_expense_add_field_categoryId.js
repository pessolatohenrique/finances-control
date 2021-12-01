"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("user_expense", "categoryId", {
      type: Sequelize.INTEGER,
      allowNull: true,
      after: "expenseId",
      references: {
        model: "categories", // Name of the created table
        key: "id",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("user_expense", "categoryId");
  },
};
