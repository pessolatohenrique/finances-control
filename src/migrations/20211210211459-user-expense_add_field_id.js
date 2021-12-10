"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("user_expense", "id", {
      allowNull: false,
      autoIncrement: true,
      after: "categoryId",
      primaryKey: true,
      type: Sequelize.INTEGER,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("user_expense", "id");
  },
};
